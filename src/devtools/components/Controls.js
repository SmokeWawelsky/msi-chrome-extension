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

  handleExport(e) {
    e.stopPropagation();
    this.getFlux().actions.pageobject.export(this.state);
  },

  render() {
    return (
      <div className="controls btn-group">
        <label className="btn btn-default btn-file">
          <span className="glyphicon glyphicon-list" />
          <input type="file" style={{ display: 'none' }} onChange={this.handleLoadPageObject} />
        </label>
        <button className="btn btn-default" disabled={!this.state.po} onClick={this.handleCapturePage}>
          <span className="glyphicon glyphicon-picture" />
        </button>
        <button className="btn btn-default" disabled={!this.state.screenshot} onClick={this.handleExport}>
          <span className="glyphicon glyphicon-export" />
        </button>
      </div>
    );
  }
});

module.exports = Control;
