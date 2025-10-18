const listEl = document.getElementById('docList');
const items = Array.from(listEl.querySelectorAll('li'));
const contentEl = document.getElementById('docContent');

function setActive(item) {
  items.forEach(i => i.classList.remove('active'));
  item.classList.add('active');
}

async function loadDoc(name) {
  contentEl.innerHTML = `<p class="loading">Loading ${name}…</p>`;
  try {
    // cache-busting param ensures updated file is fetched during development
    const module = await import(`./docs_repo/${name}.js?t=${Date.now()}`);
    if (!module || !module.content) throw new Error('Doc file did not export `content`');
    contentEl.innerHTML = module.content;
    // optional: run any inline scripts present in content
    runInlineScripts(contentEl);
  } catch (err) {
    console.error(err);
    contentEl.innerHTML = `
      <h1>Error</h1>
      <p>Failed to load documentation: <strong>${name}</strong></p>
      <pre>${err.message}</pre>
    `;
  }
}

function runInlineScripts(container) {
  // If you later inject <script type="module"> inside content, this will eval only non-module scripts.
  // We'll find script nodes and safely execute them (if they are plain scripts).
  const scripts = container.querySelectorAll('script:not([type="module"])');
  scripts.forEach(old => {
    const s = document.createElement('script');
    if (old.src) s.src = old.src;
    else s.textContent = old.textContent;
    // copy attributes except type
    for (const attr of old.attributes) if (attr.name !== 'type') s.setAttribute(attr.name, attr.value);
    old.parentNode.replaceChild(s, old);
  });
}

// wire clicks
items.forEach(item => {
  item.addEventListener('click', e => {
    const name = item.dataset.doc;
    if (!name) return;
    setActive(item);
    loadDoc(name);
    // keep focus visible and accessible
    item.focus();
    // save last open doc
    try { localStorage.setItem('everymotion.lastDoc', name); } catch {}
  });
});

// load last doc or default
const last = (() => {
  try { return localStorage.getItem('everymotion.lastDoc'); } catch { return null; }
})();
const initial = last || items[0].dataset.doc;
const initialItem = items.find(i => i.dataset.doc === initial) || items[0];
if (initialItem) {
  setActive(initialItem);
  loadDoc(initialItem.dataset.doc);
}

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    
    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

if (detectMob()) {
    document.getElementById('cprt').type = 'hidden';
    document.getElementById('cprb').type = '';
}