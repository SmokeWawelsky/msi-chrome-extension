const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');
const SplitPane = require('react-split-pane');

const Page = createReactClass({
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

  render() {
    const page = this.state.pages[this.props.index];
    const { source, uri, name, elements } = page;
    const po = JSON.stringify({ source, uri, name, elements }, null, 2);
    return (
      <SplitPane split="vertical" minSize={200} defaultSize={'50%'} primary="second">
        <div className="pre-scrollable">
          <pre>{po}</pre>
        </div>
        <div>
        {page.screenshot
          ? <img src={page.screenshot.image} className="img-responsive" />
          : <span />}
        </div>
      </SplitPane>
    );
  }
});

module.exports = Page;
