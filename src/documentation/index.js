require('./style/index.less');

const React = require('react');
const ReactDOM = require('react-dom');

const Flux = require('fluxxor').Flux;
const flux = new Flux(require('./stores'), require('./actions'));

const Documentation = require('./components/Documentation');
window.addEventListener('load', () => {
  ReactDOM.render(<Documentation flux={flux}/>, document.getElementById('container'));
});
