module.exports = {
  pageobject: require('./PageObjectActions'),

  log: require('./LogActions'),

  didConnect: function() {
    this.dispatch('connected');
  }
};
