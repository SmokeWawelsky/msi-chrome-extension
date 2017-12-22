module.exports = Object.assign({
  didConnect: function() {
    this.dispatch('connected');
  },

  log: require('./LogActions')
}, require('./ProjectActions').actions);
