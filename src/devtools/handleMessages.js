/**
 * Handles messages from Agent.
 */
const communicator = require('./communicator');
const injectAgent = require('./injectAgent');

function baseHandlers(flux, callback) {
  const handlers = {
    connected: () => flux.actions.didConnect(),

    reloaded: () => injectAgent()
  };
  Object.keys(handlers).forEach((key) => callback(key, handlers[key]));
}

module.exports = function handleMessages(flux) {
  baseHandlers(flux, (name, callback) => communicator.on(name, callback));
};
