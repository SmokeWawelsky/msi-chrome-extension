const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');

const Control = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('PageObjectStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('PageObjectStore');
  },

  handleLoadPageObject(e) {
    e.stopPropagation();
    this.getFlux().actions.pageobject.loadPageObject(e.target.files[0]);
  },

  handleCapturePage(e) {
    e.stopPropagation();
    this.getFlux().actions.pageobject.capturePage(this.state.po);
  },

  render() {
    return (
      <div className="controls">
        <button disabled={!this.state.po} onClick={this.handleCapturePage}>
          <span className="glyphicon glyphicon-picture" />
        </button>
        <input type="file" onChange={this.handleLoadPageObject} />
      </div>
    );
  }
});

module.exports = Control;
