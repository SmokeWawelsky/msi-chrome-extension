const React = require('react');
const createReactClass = require('create-react-class');
const SplitPane = require('react-split-pane');
const Header = require('./Header');
const Elements = require('./Elements');

const Documentation = createReactClass({
  render() {
    return (
      <div>
        <Header />
        <SplitPane split="vertical" minSize={200} defaultSize={400} primary="second">
          <div style={{ background: '#000' }}>
            <img id="screenshot" className="img-responsive"
              src={window.msi.screenshot.image} />
          </div>
          <div>
            <Elements />
          </div>
        </SplitPane>
      </div>
    );
  }
});

module.exports = Documentation;
