const Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
  actions: {
    'log': 'onLog'
  },

  initialize() {
    this.entries = [];
  },

  onLog(entry) {
    this.entries.push(entry);
    this.emit('change');
  }
});
