const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');

const Controls = createReactClass({
  propTypes: {
    index: PropTypes.number
  },
  mixins: [
    FluxMixin,
    StoreWatchMixin('ProjectStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('ProjectStore');
  },

  handleOpen(e) {
    e.stopPropagation();
    this.getFlux().actions.openProject(e.target.files[0]);
  },
  handleSave(e) {
    e.stopPropagation();
    this.getFlux().actions.saveProject(this.state);
  },
  handleAppendPage(e) {
    e.stopPropagation();
    this.getFlux().actions.appendPage(e.target.files[0]);
  },
  handleCapturePage(e) {
    e.stopPropagation();
    this.getFlux().actions.capturePage(this.props.index);
  },
  handleExport(e) {
    e.stopPropagation();
    this.getFlux().actions.exportHtml(this.state);
  },

  render() {
    const disabled = !this.state.pages.length;
    return (
      <div className="controls btn-group">
        <label className="btn btn-default btn-file">
          <span className="glyphicon glyphicon-folder-open" />
          <input type="file" style={{ display: 'none' }} onChange={this.handleOpen} />
        </label>
        <button className="btn btn-default" disabled={!this.state.name.length} onClick={this.handleSave}>
          <span className="glyphicon glyphicon-floppy-disk" />
        </button>
        <label className="btn btn-default btn-file">
          <span className="glyphicon glyphicon-plus-sign" />
          <input type="file" style={{ display: 'none' }} onChange={this.handleAppendPage} />
        </label>
        <button className="btn btn-default" disabled={disabled} onClick={this.handleCapturePage}>
          <span className="glyphicon glyphicon-picture" />
        </button>
        <button className="btn btn-default" disabled={!this.state.exportable} onClick={this.handleExport}>
          <span className="glyphicon glyphicon-export" />
        </button>
      </div>
    );
  }
});

module.exports = Controls;
