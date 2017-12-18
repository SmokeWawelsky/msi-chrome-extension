const communicator = require('../communicator');

let ID = 0;

module.exports = function capturePageInfo(po) {
  const id = ID++;
  return communicator.exchange({
    name: 'capturePageInfo',
    data: { id, elements: po.elements },
    response: `capturedPageInfo:${id}`
  });
};
