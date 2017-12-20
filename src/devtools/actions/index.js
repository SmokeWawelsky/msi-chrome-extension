module.exports = {
  page: require('./PageActions'),
  log: require('./LogActions'),

  didConnect: function() {
    this.dispatch('connected');
  }
};
