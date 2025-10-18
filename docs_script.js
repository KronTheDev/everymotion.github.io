const listEl = document.getElementById('docList');
const items = Array.from(listEl.querySelectorAll('li'));
const contentEl = document.getElementById('docContent');

console.log("✅ docs_script.js loaded");

async function loadDoc(name) {
  console.log("Attempting to load:", name);
  contentEl.innerHTML = `<p class="loading">Loading ${name}…</p>`;
  try {
    const module = await import(`./docs_repo/${name}.js?t=${Date.now()}`);
    console.log("Module imported:", module);
    if (!module || !module.content) {
      throw new Error("No content export found in " + name);
    }
    contentEl.innerHTML = module.content;
  } catch (err) {
    console.error("❌ Load error:", err);
    contentEl.innerHTML = `<p>Error loading <b>${name}</b>: ${err.message}</p>`;
  }
}

items.forEach(item => {
  item.addEventListener('click', () => {
    const name = item.dataset.doc;
    console.log("Clicked:", name);
    loadDoc(name);
  });
});

// auto-load first item
if (items.length) {
  const first = items[0].dataset.doc;
  console.log("Auto-load first doc:", first);
  loadDoc(first);
}
