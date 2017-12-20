const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const createReactClass = require('create-react-class');
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs');

const Logs = require('./Logs');
const Status = require('./Status');
const Controls = require('./Controls');
const Screenshot = require('./Screenshot');
const PageObject = require('./PageObject');

const Main = createReactClass({
  mixins: [ FluxMixin ],

  render() {
    return (
      <div className="main-container">
        <Status />
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
