const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');

const PageObject = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('PageObjectStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('PageObjectStore');
  },

  render() {
    const po = JSON.stringify(this.state.po, null, 2);
    return (
      <div className="pageobject pre-scrollable">
        <pre>{po}</pre>
      </div>
    );
  }
});

module.exports = PageObject;
