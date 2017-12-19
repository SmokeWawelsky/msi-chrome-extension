const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');

const symbols = {
  info: '🛈', warn: '⚠', error: '🕱'
};

const Logs = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('LogStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('LogStore');
  },

  entry(e) {
    return `${symbols[e.type]} ${e.message}`;
  },

  render() {
    return (
      <pre className="logs pre-scrollable">
        {this.state.entries.map((e) => this.entry(e)).join('\n')}
      </pre>
    );
  }
});

module.exports = Logs;
