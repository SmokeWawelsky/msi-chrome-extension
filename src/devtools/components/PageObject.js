const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');

const PageObject = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('PageStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('PageStore');
  },

  render() {
    const { source, uri, name, elements } = this.state;
    const po = JSON.stringify({ source, uri, name, elements }, null, 2);
    return (
      <div className="pageobject pre-scrollable">
        <pre>{po}</pre>
      </div>
    );
  }
});

module.exports = PageObject;
