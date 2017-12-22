const React = require('react');
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');
const SplitPane = require('react-split-pane');
const Elements = require('./Elements');

const Page = createReactClass({
  propTypes: {
    index: PropTypes.number
  },

  render() {
    return (
      <SplitPane split="vertical" minSize={200} defaultSize={400} primary="second">
        <div style={{ background: '#000' }}>
          <img id={`screenshot-${this.props.index}`} className="img-responsive"
            src={window.msi.pages[this.props.index].screenshot.image} />
        </div>
        <div>
          <Elements index={this.props.index} />
        </div>
      </SplitPane>
    );
  }
});

module.exports = Page;
