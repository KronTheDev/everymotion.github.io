const sidebarItems = document.querySelectorAll('.sidebar li');
const contentArea = document.getElementById('doc-content');

async function loadDoc(name) {
  try {
    // Dynamically import the JS file containing the `content` constant
    const module = await import(`./docs_repo/${name}.js`);
    contentArea.innerHTML = module.content;
  } catch (error) {
    console.error("Failed to load documentation:", error);
    contentArea.innerHTML = "<h1>Error</h1><p>Unable to load this documentation page.</p>";
  }
}

// Add click handlers for sidebar links
sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    sidebarItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const docName = item.getAttribute('data-doc');
    loadDoc(docName);
  });
});

// Load the first page by default
if (sidebarItems.length > 0) {
  sidebarItems[0].classList.add('active');
  loadDoc(sidebarItems[0].getAttribute('data-doc'));
}
