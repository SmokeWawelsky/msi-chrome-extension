const source = 'msi-agent';

/**
 * Send message to UI.
 */
exports.sendMessage = function(name, data = {}) {
  window.postMessage({ source, name, data }, '*');
};

/**
 * Handle messages from UI.
 */
exports.onMessage = function(handler) {
  window.addEventListener('message', (event) => {
    // Only accept messages from same frame
    if (event.source !== window) return;
    // Only accept messages of correct format (our messages)
    var message = event.data;
    if (message && message.source === 'msi-devtools') {
      handler(message);
    }
  });
};
