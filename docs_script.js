const content = document.getElementById('docContent');
const listItems = document.querySelectorAll('#docList li');

function loadDoc(docName) {
  let doc_repo = import("/docs_repo/"+docName+".js");
  let content = doc_repo.content
  content.innerHTML = content;
  listItems.forEach(li => li.classList.remove('active'));
  document.querySelector(`[data-doc="${docName}"]`).classList.add('active');
}

loadDoc('intro');

listItems.forEach(li => {
  li.addEventListener('click', () => loadDoc(li.dataset.doc));
});
