const React = require('react');
const createReactClass = require('create-react-class');
const PropTypes = require('prop-types');
const Accordion = require('react-tiny-accordion');
const SearchInput = require('react-search-input').default;
const { createFilter } = require('react-search-input');
const screenshotHelper = require('../services/screenshotHelper');

const Elements = createReactClass({
  propTypes: {
    index: PropTypes.number
  },

  getInitialState() {
    return { searchTerm: '' };
  },

  searchUpdated(searchTerm) {
    screenshotHelper.reset(this.props.index);
    this.setState({ searchTerm });
  },

  elementChange(index, isOpened) {
    if (isOpened) {
      const coords = this.elements()[index].coords;
      screenshotHelper.highlight(this.props.index, coords);
    } else {
      screenshotHelper.reset(this.props.index);
    }
  },

  elements() {
    const elements = window.msi.pages[this.props.index].elements;
    return elements.filter(createFilter(this.state.searchTerm, [ 'name' ]));
  },

  render() {
    return (
      <div>
        <SearchInput className="search-input" onChange={this.searchUpdated} />
        <Accordion className="accordion" onChange={this.elementChange}>
        {this.elements().map((e) =>
          <div key={e.name} className="panel panel-default" data-header={e.name}>
            <div className="panel-body">
              {e.selector.type}: <code>{e.selector.value}</code>
            </div>
          </div>)}
        </Accordion>
      </div>
    );
  }
});

module.exports = Elements;
