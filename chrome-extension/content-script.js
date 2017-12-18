/*
 * agent -> **content-script.js** -> background.js -> dev tools
 */
window.addEventListener('message', (event) => {
  // Only accept messages from same frame
  if (event.source !== window) return;

  const message = event.data;

  // Only accept messages of correct format (our messages)
  if (message && message.source === 'msi-agent') {
    chrome.runtime.sendMessage(message);
  }
});

/*
 * agent <- **content-script.js** <- background.js <- dev tools
 */
chrome.runtime.onMessage.addListener((request) => {
  request.source = 'msi-devtools';
  window.postMessage(request, '*');
});
