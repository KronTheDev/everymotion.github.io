document.addEventListener("DOMContentLoaded", () => {
  const ids = [
    "mainTitle", "adaptiveFN", "adaptiveLN", "adaptiveE",
    "adaptiveCN", "adaptiveCP", "adaptiveCO", "adaptiveSU"
  ];

  const delayBetween = 500;
  const typingSpeed = 10;

  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = "";
  });

  function typeText(el, text, callback) {
    let i = 0;
    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(callback, delayBetween);
      }
    }, typingSpeed);
  }

  function startTypingSequence(index = 0) {
    if (index >= ids.length) return;
    const el = document.getElementById(ids[index]);
    if (!el) return;
    const text = el.getAttribute("data-text") || el.dataset.text || el.dataset.original || el.getAttribute("original-text") || el.getAttribute("title-text") || el.getAttribute("data-typed") || el.getAttribute("data-value") || el.innerHTML || "";
    typeText(el, text.trim(), () => startTypingSequence(index + 1));
  }

  // Before starting, store original text
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.dataset.text = el.textContent.trim();
  });

  startTypingSequence();
});