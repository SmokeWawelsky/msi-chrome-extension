const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');

const Preview = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('PageObjectStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('PageObjectStore');
  },

  render() {
    return (
      <div className="preview">
        <img src={this.state.result} className="img-responsive" />
      </div>
    );
  }
});

module.exports = Preview;
