let index = true;

if (index) {
  // Create a hidden anchor to ensure the download starts on mobile browsers
  const link = document.createElement('a');
  link.href = "https://drive.google.com/uc?export=download&id=1pBXSoGA4qwnb8xWMi5AMApojcARkgF6-";
  link.download = "";
  link.style.display = "none";
  document.body.appendChild(link);

  // Trigger the download
  link.click();

  // Clean up the element after download trigger
  document.body.removeChild(link);

  // Redirect after a short delay (enough to let the download register)
  setTimeout(() => {
    window.location.href = "https://kronthedev.github.io/everymotion.github.io/typage";
  }, 2500); // 2.5 seconds is mobile-safe
}
