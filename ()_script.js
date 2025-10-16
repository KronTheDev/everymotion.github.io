let index = true;

if (index) {
  const link = document.createElement('a');
  link.href = "https://drive.google.com/uc?export=download&id=1pBXSoGA4qwnb8xWMi5AMApojcARkgF6-";
  link.download = "";
  link.style.display = "none";
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  setTimeout(() => {
    window.location.href = "https://kronthedev.github.io/everymotion.github.io/typage";
  }, 2500); 
}
