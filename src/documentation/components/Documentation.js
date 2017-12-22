const React = require('react');
const createReactClass = require('create-react-class');
const { Tab, Tabs, TabList, TabPanel } = require('react-tabs');
const Header = require('./Header');
const Page = require('./Page');

const Documentation = createReactClass({
  render() {
    return (
      <div>
        <Header />
        <Tabs>
          <TabList>
          {window.msi.pages.map((page, index) => (
            <Tab key={index}>
              {page.name}
            </Tab>))}
          </TabList>

          {window.msi.pages.map((page, index) => (
            <TabPanel key={index}>
              <Page index={index} />
            </TabPanel>))}
        </Tabs>
      </div>
    );
  }
});

module.exports = Documentation;
