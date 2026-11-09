// Audit repeated *successful* read-only calls in a Codex-style JSONL trace.
// This is a review flag for supported call shapes, not proof that a model ignored the protocol.
// No API calls, repository writes, or external dependencies are required.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const readVerb = /^(?:search|read|fetch|get|list|find|query|open|lookup)(?:_|$)/i;
const writeVerb = /^(?:write|edit|create|delete|remove|update|patch|move|rename|apply|submit|send|install)(?:_|$)/i;
const readCommand = /^\s*(?:Get-Content|Get-ChildItem|Select-String|cat|rg|grep|findstr|git\s+(?:show|grep|ls-remote|log)|curl(?:\.exe)?|Invoke-WebRequest)(?:\s|$)/i;
const writeCommand = /\b(?:Set-Content|Add-Content|Out-File|Remove-Item|Move-Item|Copy-Item|New-Item|git\s+(?:commit|apply|checkout|switch|merge|reset)|npm\s+install|pip\s+install)\b/i;

function stable(value) {
  if (typeof value === 'string') {
    const str = value.trim();
    if (/^[{\[]/.test(str)) {
      try { return stable(JSON.parse(str)); } catch { /* preserve the original */ }
    }
    return str.replace(/\s+/g, ' ');
  }
  if (Array.isArray(value)) return '[' + value.map(stable).join(',') + ']';
  if (value && typeof value === 'object') {
    return '{' + Object.keys(value).sort().map(k => JSON.stringify(k) + ':' + stable(value[k])).join(',') + '}';
  }
  return JSON.stringify(value);
}

function successful(item) {
  if (!item || item.status === 'failed' || item.status === 'error') return false;
  if (item.error || item.isError || item.result?.isError || item.response?.isError) return false;
  if (item.type === 'command_execution') return item.exit_code === 0;
  if (item.type === 'mcp_tool_call') return item.status === 'completed' || item.status === 'success';
  return false;
}

function classify(item) {
  if (!successful(item)) return { kind: 'other' };
  if (item.type === 'mcp_tool_call') {
    const tool = String(item.tool || '').split('.').pop();
    const shortTool = tool.replace(/^mcp__[^_]+__/, '');
    if (writeVerb.test(tool) || writeVerb.test(shortTool)) return { kind: 'write' };
    if (!readVerb.test(tool) && !readVerb.test(shortTool)) return { kind: 'other' };
    return { kind: 'read', display: 'MCP retrieval',
      signature: 'mcp:' + String(item.server || '') + ':' + tool + ':' + stable(item.arguments ?? {}) };
  }
  if (item.type === 'command_execution') {
    const cmd = String(item.command || '').trim();
    if (writeCommand.test(cmd)) return { kind: 'write' };
    // Codex CLI records the shell wrapper, not just the command inside -Command.
    const wrapped = /(?:^|\s)(?:["']?[^\s"']*[\\/])?(?:pwsh|powershell)(?:\.exe)?["']?\s+.*-Command\b/i.test(cmd);
    if (wrapped && /https:\/\/api\.github\.com\/search\/repositories/i.test(cmd)) {
      const queries = cmd.match(/\bqueries\s*=\s*(\[[^\r\n]*\])/i);
      if (queries) {
        try {
          const requested = JSON.parse(queries[1].replaceAll("'", '"'));
          const responses = String(item.aggregated_output || '').split(/\r?\n/).filter(Boolean).map(JSON.parse);
          if (Array.isArray(requested) && requested.length > 0 && responses.length === requested.length &&
              responses.every((r, n) => r.query === requested[n] && typeof r.total === 'number' && Array.isArray(r.items))) {
            return { kind: 'read', display: 'GitHub search batch',
              signature: 'github-search:' + stable(requested) };
          }
        } catch { /* unsupported query or response shape; do not assert success */ }
      }
    }
    if (readCommand.test(cmd) || (wrapped && /\b(?:Get-Content|Get-ChildItem|Select-String)\b/i.test(cmd))) return { kind: 'read', display: 'command_execution',
      signature: 'command:' + cmd.replace(/\s+/g, ' ') };
  }
  return { kind: 'other' };
}

function audit(events) {
  const seen = new Map();
  const duplicates = [];
  let reads = 0;
  for (let index = 0; index < events.length; index++) {
    const event = events[index];
    if (event.type !== 'item.completed') continue;
    const result = classify(event.item);
    if (result.kind === 'write') { seen.clear(); continue; }
    if (result.kind !== 'read') continue;
    reads++;
    const fingerprint = createHash('sha256').update(result.signature).digest('hex').slice(0, 12);
    const previous = seen.get(result.signature);
    if (previous !== undefined) {
      duplicates.push({ first: previous + 1, repeat: index + 1, display: result.display, fingerprint });
    } else {
      seen.set(result.signature, index);
    }
  }
  return { events: events.length, reads, duplicates, status: reads === 0 ? 'INCOMPLETE' : duplicates.length ? 'REVIEW' : 'PASS' };
}

function event(item) { return { type: 'item.completed', item }; }
function mcp(query, status = 'completed') {
  return event({ id: 'x', type: 'mcp_tool_call', server: 'github', tool: 'search',
    arguments: { query }, status });
}
function shell(cmd, exit_code = 0, aggregated_output = '') {
  return event({ type: 'command_execution', command: cmd, exit_code, aggregated_output });
}
function test() {
  const githubOutput = (queries) => queries.map(query => JSON.stringify({query, total: 1, items: [{}]})).join('\n');
  const cases = [
    ['duplicate successful search', [mcp('same'), mcp('same')], 'REVIEW', 1],
    ['different search', [mcp('A'), mcp('B')], 'PASS', 0],
    ['failed attempt then retry', [mcp('A', 'failed'), mcp('A')], 'PASS', 0],
    ['duplicate successful read', [shell('Get-Content file.txt'), shell('Get-Content file.txt')], 'REVIEW', 1],
    ['read after a write', [shell('Get-Content file.txt'), shell('Set-Content file.txt new'), shell('Get-Content file.txt')], 'PASS', 0],
    ['no retrieval is incomplete', [shell('node build.mjs')], 'INCOMPLETE', 0],
    ['tool write resets evidence', [mcp('A'), event({type:'mcp_tool_call',server:'fs',tool:'write_file',status:'completed',arguments:{path:'a'}}), mcp('A')], 'PASS', 0],
    ['whitespace args normalized', [mcp('hello   world'), mcp('hello world')], 'REVIEW', 1],
    ['wrapped successful read', [shell('pwsh -Command "Get-Content file.txt"'), shell('pwsh -Command "Get-Content file.txt"')], 'REVIEW', 1],
    ['same GitHub queries with different execution', [shell('pwsh -Command "queries=[\'A\',\'B\']; https://api.github.com/search/repositories"', 0, githubOutput(['A','B'])), shell('pwsh -Command "queries=[\'A\',\'B\']; https://api.github.com/search/repositories; parallel"', 0, githubOutput(['A','B']))], 'REVIEW', 1],
    ['different GitHub queries', [shell('pwsh -Command "queries=[\'A\']; https://api.github.com/search/repositories"', 0, githubOutput(['A'])), shell('pwsh -Command "queries=[\'B\']; https://api.github.com/search/repositories"', 0, githubOutput(['B']))], 'PASS', 0],
    ['HTTP error with shell exit zero', [shell('pwsh -Command "queries=[\'A\']; https://api.github.com/search/repositories"', 0, '{"query":"A","error":"HTTP 403"}'), shell('pwsh -Command "queries=[\'A\']; https://api.github.com/search/repositories"', 0, githubOutput(['A']))], 'PASS', 0]
  ];
  let passed = 0;
  for (const [name, trace, expected, count] of cases) {
    const result = audit(trace);
    if (result.status !== expected || result.duplicates.length !== count) {
      console.error('FAIL - ' + name + ': ' + JSON.stringify(result));
      process.exitCode = 1;
    } else {
      passed++;
      console.log('PASS - ' + name);
    }
  }
  console.log('SUMMARY: ' + passed + ' passed, ' + (cases.length - passed) + ' failed');
}

function run(path) {
  let lines;
  try { lines = readFileSync(path, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter(x => x.trim()); }
  catch { console.error('INCOMPLETE - cannot read trace'); process.exitCode = 2; return; }
  const records = [];
  try { for (const line of lines) records.push(JSON.parse(line)); }
  catch { console.error('INCOMPLETE - invalid JSONL'); process.exitCode = 2; return; }
  const result = audit(records);
  console.log('STATUS: ' + result.status + ' | events=' + result.events + ' | successful_reads=' + result.reads + ' | repeated=' + result.duplicates.length);
  for (const d of result.duplicates) {
    console.log('REVIEW - duplicate successful retrieval: first_line=' + d.first + ', repeated_line=' + d.repeat + ', tool=' + d.display + ', sha12=' + d.fingerprint);
  }
  console.log('NOTE: Only supported call shapes are audited. Review flags require context; PASS does not establish model behavior improvement.');
  process.exitCode = result.status === 'PASS' ? 0 : result.status === 'REVIEW' ? 1 : 2;
}

if (process.argv[2] === '--self-test') test();
else if (process.argv[2]) run(process.argv[2]);
else { console.error('Usage: node tests/check-retrieval-trace.mjs TRACE.jsonl | --self-test'); process.exitCode = 2; }
