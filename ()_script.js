function startDownloadAndRedirect({
  downloadUrl = "https://drive.google.com/uc?export=download&id=1pBXSoGA4qwnb8xWMi5AMApojcARkgF6-",
  redirectUrl = "https://kronthedev.github.io/everymotion.github.io/typage",
  redirectDelay = 2500
} = {}) {
  let newTab;
  try {
    newTab = window.open(downloadUrl, "_blank");
  } catch (e) {
    newTab = null;
  }

  try {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = downloadUrl;
    document.body.appendChild(iframe);
    setTimeout(() => {
      iframe.remove();
    }, 15000);
  } catch (e) {
    // ignore
  }

  setTimeout(() => {
    window.location.href = redirectUrl;
  }, redirectDelay);
}

(function autoRunIfWanted() {
  const shouldAutoRun = false;
  if (!shouldAutoRun) return;
  setTimeout(() => startDownloadAndRedirect(), 800);
})();

