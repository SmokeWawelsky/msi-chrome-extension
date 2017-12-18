const backgroundPageConnection = chrome.runtime.connect({
  name: 'panel'
});

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
});

/**
 * Send message to Agent.
 */
exports.sendMessage = function(name, data = {}) {
  backgroundPageConnection.postMessage({
    name, data,
    tabId: chrome.devtools.inspectedWindow.tabId
  });
};

/**
 * Handle messages from Agent
 */
exports.onMessage = function(handler) {
  backgroundPageConnection.onMessage.addListener(handler);
};

/**
 * Handle specific messages from Agent.
 */
exports.on = function(name, handler) {
  exports.onMessage((message) => {
    if (message.name === name) handler(message.data);
  });
};

/**
 * Handle next specific message from Agent.
 */
exports.once = function(name, handler) {
  const once = (message) => {
    if (message.name === name) {
      backgroundPageConnection.onMessage.removeListener(once);
      handler(message.data);
    }
  };
  exports.onMessage(once);
};

/**
 * Send message to Agent and await response.
 */
exports.exchange = function(req) {
  return new Promise((resolve) => {
    exports.once(req.response, resolve);
    exports.sendMessage(req.name, req.data);
  });
};
