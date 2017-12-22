const FileSaver = require('file-saver');

exports.readFile = function(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = (e) => resolve(e.target.result);
    reader.readAsText(file);
  });
};

exports.saveFile = function(name, mime, content) {
  const blob = new Blob([ content ], { type: mime });
  FileSaver.saveAs(blob, name);
  return Promise.resolve(name);
};
