const React = require('react');
const createReactClass = require('create-react-class');

const Header = createReactClass({
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a href="javascript:void(0)" className="navbar-brand">
              Documentation
            </a>
          </div>
          <div className="navbar-text">
            <ul className="list-inline">
              <li>
                name: <code>{window.msi.name}</code>
              </li>
              <li>
                uri: <code>{window.msi.uri}</code>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

module.exports = Header;
