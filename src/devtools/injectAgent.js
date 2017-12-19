const communicator = require('./communicator');
const request = require('./request');

// thx https://github.com/emberjs/ember-inspector/blob/master/app/adapters/chrome.js
module.exports = function injectAgent() {
  const injectedGlobal = 'window.__msi_agent_injected__';
  chrome.devtools.inspectedWindow.eval(injectedGlobal, (result) => {
    if (result) {
      // we're already injected, so just connect
      communicator.sendMessage('connect');
    } else {
      // script hasn't been injected yet
      const agentUrl = chrome.extension.getURL('/build/agent.bundle.js');
      request(agentUrl).then((script) => {
        chrome.devtools.inspectedWindow.eval(script, (result, err) => {
          if (err) console.error(err.value);
          else communicator.sendMessage('connect');
        });
      }, (err) => console.error(err));
    }
  });
};
