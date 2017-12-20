const readFile = require('./readFile');
const parsers = require('../parsers');

module.exports = function loadPageObject(file) {
  return parsers.findFor(file.name).then((parser) => {
    return readFile(file).then((content) => {
      return parser.parse(content, file);
    });
  });
};
