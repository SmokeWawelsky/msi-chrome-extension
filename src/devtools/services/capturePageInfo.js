const communicator = require('../communicator');

let ID = 0;

module.exports = function capturePageInfo(elements) {
  const id = ID++;
  return communicator.exchange({
    name: 'capturePageInfo',
    data: { id, elements },
    response: `capturedPageInfo:${id}`
  });
};
