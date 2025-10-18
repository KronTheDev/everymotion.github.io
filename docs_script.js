const docs = {
  intro: `
    <h1>Introduction</h1>
    <p>Welcome to the EveryMotion SDK documentation. Here, you'll learn how to integrate real-world movement into digital environments with seamless precision.</p>
  `,
  install: `
    <h1>Installation</h1>
    <p>To install the EveryMotion SDK, run the following command:</p>
    <pre><code>npm install everymotion-sdk</code></pre>
  `,
  sdk: `
    <h1>SDK Overview</h1>
    <p>The SDK provides tools for motion capture, gesture recognition, and predictive movement reconstruction using RAG-enhanced AI models.</p>
  `,
  integration: `
    <h1>Integration</h1>
    <p>Include the SDK in your VR/AR app using the following snippet:</p>
    <pre><code>import { EveryMotion } from 'everymotion-sdk';
const motion = new EveryMotion();
motion.startTracking();</code></pre>
  `,
  faq: `
    <h1>FAQ</h1>
    <p><strong>Q:</strong> Is EveryMotion compatible with all VR headsets?<br>
    <strong>A:</strong> Yes, it integrates seamlessly with all major platforms.</p>
  `
};

// Default content
const content = document.getElementById('docContent');
const listItems = document.querySelectorAll('#docList li');

function loadDoc(docName) {
  content.innerHTML = docs[docName];
  listItems.forEach(li => li.classList.remove('active'));
  document.querySelector(`[data-doc="${docName}"]`).classList.add('active');
}

// Set initial page
loadDoc('intro');

// Add click listeners
listItems.forEach(li => {
  li.addEventListener('click', () => loadDoc(li.dataset.doc));
});
