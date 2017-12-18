const stores = [
  'ConnectionStore',
  'PageObjectStore'
];

module.exports = {};

stores.forEach((name) => {
  const Store = require(`./${name}`);
  module.exports[name] = new Store();
});
