const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const classNames = require('classnames');

const Status = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('ConnectionStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('ConnectionStore');
  },

  render() {
    const statusClass = classNames('status', 'glyphicon', {
      'glyphicon-ok-circle': this.state.isConnected,
      'glyphicon-ban-circle': !this.state.isConnected
    });
    return <span className={statusClass} />;
  }
});

module.exports = Status;
