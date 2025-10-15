/**
 * Start file download and then navigate to target page.
 * Best used in response to a user click (less likely to be blocked).
 */
function startDownloadAndRedirect({
  downloadUrl = "https://drive.google.com/uc?export=download&id=1pBXSoGA4qwnb8xWMi5AMApojcARkgF6-",
  redirectUrl = "https://kronthedev.github.io/everymotion.github.io/typage",
  redirectDelay = 2500 // ms, adjust if your download takes longer to initiate
} = {}) {
  // 1) Open a new tab (may be blocked by popup blockers if not a user gesture)
  let newTab;
  try {
    newTab = window.open(downloadUrl, "_blank");
  } catch (e) {
    newTab = null;
  }

  // 2) Always create a hidden iframe as a fallback to kick off the download
  try {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = downloadUrl;
    // append to body to start
    document.body.appendChild(iframe);
    // remove iframe after a while to keep DOM clean
    setTimeout(() => {
      iframe.remove();
    }, 15000);
  } catch (e) {
    // ignore
  }

  // 3) If newTab exists and was blocked, newTab will be null. We don't need to handle that specially.
  // 4) Redirect the current page after a short delay so the download has time to begin
  setTimeout(() => {
    window.location.href = redirectUrl;
  }, redirectDelay);
}

/* Example usage:
   Best: call this from a click handler on a "Download & Continue" button:
   <button id="dlBtn">Download & Continue</button>
   document.getElementById('dlBtn').addEventListener('click', () => startDownloadAndRedirect());
*/

/* Optional: auto-run once if you absolutely must (may be blocked by browsers) */
(function autoRunIfWanted() {
  const shouldAutoRun = false; // set true only if you accept download-block risk
  if (!shouldAutoRun) return;
  // small delay to let DOM settle
  setTimeout(() => startDownloadAndRedirect(), 800);
})();

