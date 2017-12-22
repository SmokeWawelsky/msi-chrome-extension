const stores = [
  'ConnectionStore',
  'ProjectStore',
  'LogStore'
];

module.exports = {};

stores.forEach((name) => {
  const Store = require(`./${name}`);
  module.exports[name] = new Store();
});
