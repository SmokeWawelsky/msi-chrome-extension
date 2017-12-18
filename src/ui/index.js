require('../../style/main.less');

const React = require('react');
const ReactDOM = require('react-dom');

const Flux = require('fluxxor').Flux;
const flux = new Flux(require('./stores'), require('./actions'));

const injectAgent = require('./injectAgent');
const handleMessages = require('./handleMessages');
injectAgent();
handleMessages(flux);

const Main = require('./components/Main');
window.addEventListener('load', () => {
  ReactDOM.render(<Main flux={flux}/>, document.getElementById('container'));
});
