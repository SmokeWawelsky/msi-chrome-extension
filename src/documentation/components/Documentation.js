const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const SplitPane = require('react-split-pane');
const Elements = require('./Elements');

const Documentation = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('MsiStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('MsiStore');
  },

  render() {
    return (
      <SplitPane split="vertical" minSize={200} defaultSize={400} primary="second">
        <div style={{ background: '#000' }}>
          <img id="screenshot" className="img-responsive"
            src={this.state.screenshot.image} />
        </div>
        <div>
          <Elements />
        </div>
      </SplitPane>
    );
  }
});

module.exports = Documentation;
