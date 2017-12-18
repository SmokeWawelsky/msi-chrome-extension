const communicator = require('../communicator');

let ID = 0;

module.exports = function capturePageInfo(po) {
  const id = ID++;
  const selectors = Object.keys(po);
  return communicator.exchange({
    name: 'capturePageInfo',
    data: { id, selectors },
    response: `capturedPageInfo:${id}`
  });
};
