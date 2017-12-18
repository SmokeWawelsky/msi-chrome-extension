const pageobject = require('./PageObjectActions');

module.exports = {
  pageobject,

  didConnect: function() {
    this.dispatch('connected');
  }
};
