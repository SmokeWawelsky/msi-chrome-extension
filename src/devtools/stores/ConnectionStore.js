const Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
  actions: {
    'connected': 'onConnected'
  },

  initialize() {
    this.isConnected = false;
  },

  onConnected() {
    this.isConnected = true;
    this.emit('change');
  }
});
