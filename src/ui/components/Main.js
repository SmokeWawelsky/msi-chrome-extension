const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const Controls = require('./Controls');
const Preview = require('./Preview');
const PageObject = require('./PageObject');

const Main = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('ConnectionStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('ConnectionStore');
  },

  render() {
    const statusIcon = this.state.isConnected
      ? 'glyphicon glyphicon-ok-circle'
      : 'glyphicon glyphicon-ban-circle';
    return (
      <div className="main-container">
        <div className="row">
          <div className="col-md-6">
            <Preview />
          </div>
          <div className="col-md-6">
            <span className={statusIcon} />
            <Controls />
            <PageObject />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Main;
