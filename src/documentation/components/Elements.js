const React = require('react');
const createReactClass = require('create-react-class');
const Accordion = require('react-tiny-accordion');
const SearchInput = require('react-search-input').default;
const { createFilter } = require('react-search-input');

const Elements = createReactClass({
  getInitialState() {
    return { searchTerm: '' };
  },

  searchUpdated(searchTerm) {
    this.setState({ searchTerm });
  },

  render() {
    const elements = window.msi.po.elements.filter(createFilter(this.state.searchTerm, [ 'name' ]));
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <Accordion className="accordion">
        {elements.map((e) =>
          <div key={e.name} className="panel panel-default" data-header={e.name}>
            <div className="panel-body">
              {e.selector.type}: {e.selector.value}
            </div>
          </div>)}
        </Accordion>
      </div>
    );
  }
});

module.exports = Elements;
