const readFile = require('./readFile');

module.exports = function loadPageObject(file) {
  return readFile(file).then((content) => {
    return {
      file, content, object: parse(content)
    };
  });
};

function parse(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    console.warn(e);
  }
}
