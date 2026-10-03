/**
 * Publica o site: gera _site/ e envia para a branch gh-pages (GitHub Pages
 * lê dessa branch).
 *
 *   npm run deploy
 *
 * Usa um worktree temporário da gh-pages, então a pasta de trabalho não muda.
 */

import {execFileSync} from 'node:child_process';
import {cpSync, existsSync, mkdtempSync, readdirSync, rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (args, cwd = root) => execFileSync('git', args, {cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'inherit']}).trim();

execFileSync(process.execPath, [path.join(root, 'scripts', 'build.mjs')], {stdio: 'inherit'});

const source = git(['rev-parse', '--short', 'HEAD']);
const work = mkdtempSync(path.join(os.tmpdir(), 'vellum-docs-pages-'));
const hasRemoteBranch = git(['ls-remote', '--heads', 'origin', 'gh-pages']).length > 0;
if (hasRemoteBranch) {
  git(['fetch', 'origin', 'gh-pages']);
  git(['worktree', 'add', '-f', work, 'FETCH_HEAD']);
} else {
  git(['worktree', 'add', '-f', '--detach', work]);
  git(['checkout', '--orphan', 'gh-pages-tmp'], work);
}
try {
  for (const entry of readdirSync(work)) if (entry !== '.git') rmSync(path.join(work, entry), {recursive: true, force: true});
  cpSync(path.join(root, '_site'), work, {recursive: true});
  git(['add', '-A'], work);
  const changed = git(['status', '--porcelain'], work);
  if (!changed) {
    console.log('Nada mudou no site.');
  } else {
    git(['commit', '-q', '-m', `Publica a documentação (${source})`], work);
    git(['push', 'origin', 'HEAD:gh-pages'], work);
    console.log('Publicado na branch gh-pages.');
  }
} finally {
  git(['worktree', 'remove', '--force', work]);
  if (existsSync(work)) rmSync(work, {recursive: true, force: true});
}
