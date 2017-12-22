const React = require('react');
const FluxMixin = require('fluxxor').FluxMixin(React);
const StoreWatchMixin = require('fluxxor').StoreWatchMixin;
const createReactClass = require('create-react-class');
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs');

const Controls = require('./Controls');
const Page = require('./Page');

const Project = createReactClass({
  mixins: [
    FluxMixin,
    StoreWatchMixin('ProjectStore')
  ],

  getStateFromFlux() {
    return this.getFlux().store('ProjectStore');
  },

  handlePageRemove(e, index) {
    e.stopPropagation();
    this.getFlux().actions.removePage(index);
  },

  handlePageSelection(index) {
    this.getFlux().actions.pageSelected(index);
  },

  render() {
    return (
      <div>
        <Controls index={this.state.pageIndex} />

        <Tabs selectedIndex={this.state.pageIndex} onSelect={this.handlePageSelection}>
          <TabList>
            {this.state.pages.map((page, index) => (
              <Tab key={index}>
                <span>
                  {page.name}
                </span>
                <button type="button" className="close" aria-label="Close"
                  onClick={(e) => this.handlePageRemove(e, index)}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </Tab>
            ))}
          </TabList>

          {this.state.pages.map((page, index) => (
            <TabPanel key={index}>
              <Page index={index} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
});

module.exports = Project;
