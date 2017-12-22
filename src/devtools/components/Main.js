const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs');

const Status = require('./Status');
const Project = require('./Project');
const Logs = require('./Logs');

const Main = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('ProjectStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('ProjectStore');
  },

  handleProjectNameChange(e) {
    this.getFlux().actions.updateName(e.target.value);
  },

  render() {
    return (
      <div className="main-container">
        <Tabs defaultIndex={1}>
          <TabList>
            <Tab disabled={true}>
              <Status />
            </Tab>
            <Tab>
              <form className="form-inline">
                <div className="form-group">
                  <span>
                    {this.state.modified ? '*' : ''}
                  </span>
                  <label htmlFor="projectName">
                    <span>Project</span>
                  </label>
                  <input id="projectName" className="form-control input-sm"
                    type="text" value={this.state.name} placeholder="set name"
                    onChange={this.handleProjectNameChange} />
                </div>
              </form>
            </Tab>
            <Tab>
              Logs
            </Tab>
          </TabList>

          <TabPanel />
          <TabPanel>
            <Project />
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
