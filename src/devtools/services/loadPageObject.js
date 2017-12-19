const readFile = require('./readFile');
const parsers = require('../parsers');

module.exports = function loadPageObject(file) {
  return parsers.findFor(file.name).then((parser) => {
    return readFile(file).then((content) => {
      const object = parser.parse(content, file);
      return { file, object };
    });
  });
};

// function parse(text) {
//   try {
//     return JSON.parse(text);
//   } catch (e) {
//     console.warn(e);
//   }
// }
