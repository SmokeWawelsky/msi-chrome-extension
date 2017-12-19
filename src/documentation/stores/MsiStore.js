const Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
  actions: {},

  initialize() {
    Object.assign(this, window.msi);
  }
});
