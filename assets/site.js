// Busca, menu no celular, botões de copiar, item ativo do "Nesta página" e a
// frase escrita à mão da página inicial.

const normalize = (text) => String(text).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// --- Busca --------------------------------------------------------------------
const input = document.getElementById('search-input');
const results = document.getElementById('search-results');
let index = null;
let selected = -1;

const loadIndex = async () => {
  if (index) return index;
  const response = await fetch('search.json');
  index = (await response.json()).map((item) => ({...item, haystack: normalize(`${item.page} ${item.title} ${item.text}`)}));
  return index;
};

const snippet = (text, terms) => {
  const plain = normalize(text);
  const at = Math.max(0, plain.indexOf(terms[0]) - 40);
  return (at > 0 ? '…' : '') + text.slice(at, at + 140) + (text.length > at + 140 ? '…' : '');
};

const render = (items, terms) => {
  selected = -1;
  if (!items.length) {
    results.innerHTML = '<li class="empty">Nada encontrado. Tente outra palavra.</li>';
  } else {
    results.innerHTML = items.slice(0, 12).map((item) => {
      const heading = item.title === item.page ? item.page : `${item.page}: ${item.title}`;
      return `<li><a href="${item.href}"><strong></strong><small></small></a></li>`.replace('<strong></strong>', `<strong>${escape(heading)}</strong>`).replace('<small></small>', `<small>${escape(snippet(item.text, terms))}</small>`);
    }).join('');
  }
  results.hidden = false;
};

const escape = (text) => String(text).replace(/[&<>"]/g, (char) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'})[char]);

input?.addEventListener('input', async () => {
  const query = normalize(input.value.trim());
  if (query.length < 2) {
    results.hidden = true;
    return;
  }
  const terms = query.split(/\s+/);
  // Plural e singular: 'imagem' acha 'imagens' (compara sem a última letra).
  const stems = terms.map((term) => (term.length >= 5 ? term.slice(0, -1) : term));
  const items = (await loadIndex())
    .map((item) => ({item, score: stems.every((stem) => item.haystack.includes(stem)) ? stems.reduce((sum, stem) => sum + (normalize(item.title).includes(stem) ? 3 : 1), 0) : 0}))
    .filter(({score}) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({item}) => item);
  render(items, terms);
});

input?.addEventListener('keydown', (event) => {
  const links = [...results.querySelectorAll('a')];
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    selected = Math.max(0, Math.min(links.length - 1, selected + (event.key === 'ArrowDown' ? 1 : -1)));
    links.forEach((link, i) => link.setAttribute('aria-selected', String(i === selected)));
    links[selected]?.scrollIntoView({block: 'nearest'});
  } else if (event.key === 'Enter' && links[Math.max(0, selected)]) {
    window.location.href = links[Math.max(0, selected)].href;
  } else if (event.key === 'Escape') {
    results.hidden = true;
    input.blur();
  }
});

document.addEventListener('keydown', (event) => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    input?.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.search')) results.hidden = true;
});

// --- Menu no celular ----------------------------------------------------------
const toggle = document.querySelector('.menu-toggle');
const sidebar = document.getElementById('sidebar');
toggle?.addEventListener('click', () => {
  const open = sidebar.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.textContent = open ? 'Fechar' : 'Menu';
});

// --- Copiar código --------------------------------------------------------------
document.querySelectorAll('.code .copy').forEach((button) => {
  button.addEventListener('click', async () => {
    const code = button.parentElement.querySelector('code').textContent;
    try {
      await navigator.clipboard.writeText(code);
      button.textContent = 'Copiado';
    } catch {
      button.textContent = 'Não copiou';
    }
    setTimeout(() => { button.textContent = 'Copiar'; }, 1500);
  });
});

// --- "Nesta página": marca a seção que está na tela -----------------------------------
const tocLinks = [...document.querySelectorAll('.toc a')];
if (tocLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(tocLinks.map((link) => [decodeURIComponent(link.hash.slice(1)), link]));
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      tocLinks.forEach((link) => link.classList.remove('is-active'));
      byId.get(entry.target.id)?.classList.add('is-active');
    }
  }, {rootMargin: '-70px 0px -70% 0px'});
  document.querySelectorAll('.content h2[id], .content h3[id]').forEach((heading) => observer.observe(heading));
}

// --- Página inicial: escreve a frase letra a letra, como a mão do vídeo --------------
const line = document.querySelector('.hero-line');
if (line) {
  const text = line.textContent.trim();
  line.setAttribute('aria-label', text);
  let count = 0;
  line.innerHTML = text.split(' ').map((word) => `<span aria-hidden="true" style="white-space:nowrap">${[...word].map((char) => `<span class="letter" style="--i:${count++}">${escape(char)}</span>`).join('')}</span>`).join('<span class="space" aria-hidden="true"> </span>');
  document.querySelector('.hero-underline')?.style.setProperty('--underline-delay', `${count * 45 + 150}ms`);
}
