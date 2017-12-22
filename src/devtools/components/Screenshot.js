const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');

const Screenshot = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('ProjectStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('ProjectStore');
  },

  render() {
    return this.state.screenshot
      ? <img src={this.state.screenshot.image} className="img-responsive" />
      : <span />;
  }
});

module.exports = Screenshot;
