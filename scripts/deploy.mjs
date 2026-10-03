/**
 * Publica o site: gera _site/ e envia para a branch gh-pages, que o GitHub
 * Pages publica.
 *
 *   npm run deploy
 *
 * O site gerado vira um repositório temporário com um commit só, enviado com
 * --force para a gh-pages: a branch guarda apenas a versão publicada, e a
 * pasta de trabalho não muda.
 */

import {execFileSync} from 'node:child_process';
import {cpSync, mkdtempSync, rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (args, cwd = root) => execFileSync('git', args, {cwd, encoding: 'utf8'}).trim();

execFileSync(process.execPath, [path.join(root, 'scripts', 'build.mjs')], {stdio: 'inherit'});

const remote = git(['remote', 'get-url', 'origin']);
const source = git(['rev-parse', '--short', 'HEAD']);
// Mesma credencial configurada neste repositório (ex.: gh auth git-credential).
const helper = (() => {
  try { return git(['config', '--get', 'credential.https://github.com.helper']); } catch { return ''; }
})();

const work = mkdtempSync(path.join(os.tmpdir(), 'vellum-docs-pages-'));
try {
  cpSync(path.join(root, '_site'), work, {recursive: true});
  git(['init', '-q', '-b', 'gh-pages'], work);
  git(['add', '-A'], work);
  git(['-c', 'user.name=Vellum docs', '-c', 'user.email=docs@vellum.local', 'commit', '-q', '-m', `Publica a documentação (${source})`], work);
  git([...(helper ? ['-c', 'credential.helper=', '-c', `credential.helper=${helper}`] : []), 'push', '-q', '--force', remote, 'gh-pages'], work);
  console.log(`Publicado na branch gh-pages (${source}).`);
} finally {
  rmSync(work, {recursive: true, force: true});
}
