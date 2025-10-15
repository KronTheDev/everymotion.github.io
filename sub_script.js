document.addEventListener("DOMContentLoaded", () => {
  const ids = [
    "adaptiveFN", "adaptiveLN", "adaptiveE",
    "adaptiveCN", "adaptiveCP", "adaptiveCO", "adaptiveSU"
  ];
  const delayBetween = 500; // ms between each title
  const typingSpeed = 60;   // ms per letter

  function typeText(el, text, callback) {
    el.textContent = "";
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
    const text = el.textContent.trim();
    typeText(el, text, () => startTypingSequence(index + 1));
  }

  startTypingSequence();
});