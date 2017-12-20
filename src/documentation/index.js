require('./style/index.less');

const React = require('react');
const ReactDOM = require('react-dom');

const Documentation = require('./components/Documentation');
window.addEventListener('load', () => {
  ReactDOM.render(<Documentation />, document.getElementById('container'));
});
