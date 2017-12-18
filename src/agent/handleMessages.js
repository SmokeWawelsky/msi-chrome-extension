/**
 * Handles messages from UI.
 */
const communicator = require('./communicator');
const capturePageInfo = require('./capturePageInfo');

const handlers = {
  // Broadcast when the dev tools are opened
  connect() {
    communicator.sendMessage('connected');
  },

  capturePageInfo(data) {
    const response = capturePageInfo(data);
    console.log('[msi:agent] page info', response);
    communicator.sendMessage(`capturedPageInfo:${data.id}`, response);
  },

  scrollTo(data) {
    console.log('[msi:agent] scroll to', data);
    window.scrollTo(0, data.y);
    window.setTimeout(() => communicator.sendMessage(`scrolled:${data.id}`));
  }
};

module.exports = function handleMessages(message) {
  const handler = handlers[message.name];
  if (handler) {
    handler(message.data);
  } else {
    console.warn('[msi:agent] No handler found for event ' + message.name);
  }
};
