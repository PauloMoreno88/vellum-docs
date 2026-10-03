/**
 * Gera o site da documentação em _site/ a partir de content/*.md.
 *
 *   npm run build      # gera _site/
 *   npm run serve      # gera e serve em http://localhost:4173
 *
 * Cada arquivo de content/ tem um cabeçalho:
 *
 *   ---
 *   title: Título da página
 *   description: Uma frase sobre a página (aparece na busca e no <meta>)
 *   group: Grupo do menu lateral
 *   ---
 *
 * A ordem do menu é a ordem dos nomes dos arquivos (01-, 02-...); o prefixo
 * numérico sai do endereço da página. index.md vira a página inicial.
 *
 * Blocos extras no Markdown:
 *   :::regra Título     caixa azul: regra do sistema
 *   :::passo Título     caixa verde: o que fazer
 *   :::trava Título     caixa vermelha: o que bloqueia ou não pode
 *   :::nota Título      caixa neutra
 *   :::
 *
 *   ```etapas
 *   Nome da etapa | o que ela faz
 *   ```                 lista numerada de etapas (pipeline)
 */

import {cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {Marked} from 'marked';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'content');
const out = path.join(root, '_site');

const escapeHtml = (text) => String(text)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const slugify = (text) => String(text)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/<[^>]+>/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/(^-|-$)+/g, '');

const parsePage = (file) => {
  const raw = readFileSync(path.join(contentDir, file), 'utf8').replace(/\r\n/g, '\n');
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) throw new Error(`${file}: sem cabeçalho ---`);
  const meta = Object.fromEntries(match[1].split('\n').map((line) => {
    const at = line.indexOf(':');
    return [line.slice(0, at).trim(), line.slice(at + 1).trim()];
  }));
  const name = file.replace(/\.md$/, '').replace(/^\d+-/, '');
  const slug = name === 'index' ? 'index' : name;
  return {file, slug, href: slug === 'index' ? './' : `${slug}.html`, ...meta, body: raw.slice(match[0].length)};
};

const CALLOUTS = {regra: 'Regra', passo: 'Como fazer', trava: 'Trava', nota: 'Nota'};

/** :::tipo Título ... ::: → HTML da caixa, com Markdown dentro. */
const expandCallouts = (markdown) => markdown.replace(/^:::(regra|passo|trava|nota)(?: (.*))?\n([\s\S]*?)\n:::$/gm, (_, kind, title, inner) => {
  const heading = title?.trim() || CALLOUTS[kind];
  return `<div class="callout callout-${kind}" role="note">\n<p class="callout-title">${escapeHtml(heading)}</p>\n\n${inner}\n\n</div>`;
});

const renderPage = (page) => {
  const toc = [];
  const sections = [];
  let current = {heading: page.title, id: '', text: []};
  const marked = new Marked({
    gfm: true,
    renderer: {
      heading({tokens, depth}) {
        const html = this.parser.parseInline(tokens);
        const plain = html.replace(/<[^>]+>/g, '');
        const id = slugify(plain);
        if (depth === 2 || depth === 3) toc.push({depth, id, text: plain});
        return `<h${depth} id="${id}"><a class="anchor" href="#${id}" aria-label="Link para esta seção">#</a>${html}</h${depth}>\n`;
      },
      code({text, lang}) {
        if (lang === 'etapas') {
          const items = text.split('\n').filter(Boolean).map((line) => {
            const [name, ...rest] = line.split('|');
            return `<li><strong>${escapeHtml(name.trim())}</strong><span>${marked.parseInline(rest.join('|').trim())}</span></li>`;
          });
          return `<ol class="steps">\n${items.join('\n')}\n</ol>\n`;
        }
        const label = lang ? `<span class="code-lang">${escapeHtml(lang)}</span>` : '';
        return `<div class="code">${label}<button class="copy" type="button">Copiar</button><pre><code>${escapeHtml(text)}</code></pre></div>\n`;
      },
      table(token) {
        const head = token.header.map((cell) => `<th>${this.parser.parseInline(cell.tokens)}</th>`).join('');
        const rows = token.rows.map((row) => `<tr>${row.map((cell) => `<td>${this.parser.parseInline(cell.tokens)}</td>`).join('')}</tr>`).join('\n');
        return `<div class="table"><table><thead><tr>${head}</tr></thead><tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });
  const tokens = marked.lexer(expandCallouts(page.body));
  // Busca: o texto de cada seção (h2) vem dos tokens, na ordem do documento.
  const plainText = (token) => String(token.text ?? token.raw ?? '').replace(/<[^>]+>/g, ' ').replace(/[`*_[\]()#|>]/g, ' ');
  for (const token of tokens) {
    if (token.type === 'heading' && token.depth === 2) {
      sections.push(current);
      const heading = token.text.replace(/[`*_]/g, '');
      current = {heading, id: slugify(heading), text: []};
    } else if (token.type !== 'space') {
      current.text.push(plainText(token));
    }
  }
  sections.push(current);
  const html = marked.parser(tokens);
  return {html, toc, sections: sections.filter((section) => section.text.length || section.id)};
};

const files = readdirSync(contentDir).filter((file) => file.endsWith('.md')).sort();
const pages = files.map(parsePage);
const groups = [];
for (const page of pages) {
  let group = groups.find((item) => item.name === page.group);
  if (!group) groups.push(group = {name: page.group, pages: []});
  group.pages.push(page);
}

const layout = readFileSync(path.join(root, 'scripts', 'layout.html'), 'utf8');

rmSync(out, {recursive: true, force: true});
mkdirSync(out, {recursive: true});
cpSync(path.join(root, 'assets'), path.join(out, 'assets'), {recursive: true});

const searchIndex = [];
pages.forEach((page, index) => {
  const {html, toc, sections} = renderPage(page);
  const nav = groups.map((group) => `<div class="nav-group"><p class="nav-group-title">${escapeHtml(group.name)}</p><ul>${group.pages.map((item) =>
    `<li><a href="${item.href}"${item === page ? ' aria-current="page"' : ''}>${escapeHtml(item.title)}</a></li>`).join('')}</ul></div>`).join('\n');
  const tocHtml = toc.length
    ? `<p class="toc-title">Nesta página</p><ul>${toc.map((item) => `<li class="toc-${item.depth}"><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`).join('')}</ul>`
    : '';
  const prev = pages[index - 1];
  const next = pages[index + 1];
  const pager = `<nav class="pager" aria-label="Página anterior e próxima">${prev ? `<a class="pager-prev" href="${prev.href}"><span>Anterior</span>${escapeHtml(prev.title)}</a>` : '<span></span>'}${next ? `<a class="pager-next" href="${next.href}"><span>Próxima</span>${escapeHtml(next.title)}</a>` : ''}</nav>`;
  const isHome = page.slug === 'index';
  const document = layout
    .replaceAll('{{title}}', escapeHtml(isHome ? 'Vellum · Documentação' : `${page.title} · Vellum`))
    .replaceAll('{{description}}', escapeHtml(page.description ?? ''))
    .replace('{{nav}}', nav)
    .replace('{{toc}}', tocHtml)
    .replace('{{bodyClass}}', isHome ? 'home' : 'page')
    .replace('{{pageTitle}}', isHome ? '' : `<h1>${escapeHtml(page.title)}</h1>${page.description ? `<p class="lede">${escapeHtml(page.description)}</p>` : ''}`)
    .replace('{{content}}', html)
    .replace('{{pager}}', pager);
  writeFileSync(path.join(out, page.slug === 'index' ? 'index.html' : `${page.slug}.html`), document);
  for (const section of sections) {
    searchIndex.push({
      page: page.title,
      title: section.heading,
      href: `${page.href}${section.id ? `#${section.id}` : ''}`,
      text: section.text.join(' ').replace(/\s+/g, ' ').slice(0, 600),
    });
  }
});
writeFileSync(path.join(out, 'search.json'), JSON.stringify(searchIndex));
writeFileSync(path.join(out, '.nojekyll'), '');
console.log(`${pages.length} páginas → ${path.relative(root, out)}/`);
if (!existsSync(path.join(out, 'index.html'))) throw new Error('Falta content/index.md');
