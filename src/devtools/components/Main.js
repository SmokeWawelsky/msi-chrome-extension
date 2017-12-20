const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs');
const classNames = require('classnames');

const Logs = require('./Logs');
const Controls = require('./Controls');
const Screenshot = require('./Screenshot');
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
    const statusClass = classNames('status', 'glyphicon', {
      'glyphicon-ok-circle': this.state.isConnected,
      'glyphicon-ban-circle': !this.state.isConnected
    });
    return (
      <div className="main-container">
        <span className={statusClass} />

        <Controls />

        <Tabs>
          <TabList>
            <Tab>Preview</Tab>
            <Tab>Logs</Tab>
          </TabList>

          <TabPanel>
            <div className="row">
              <div className="col-md-6">
                <PageObject />
              </div>
              <div className="col-md-6">
                <Screenshot />
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <Logs />
          </TabPanel>
        </Tabs>
      </div>
    );
  }
});

module.exports = Main;
