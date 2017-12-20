const FileSaver = require('file-saver');
const http = require('../../common/http');

const jsBundleUrl = chrome.extension.getURL('/build/documentation.bundle.js');

const serialize = (title, jsBundle, msi) => `<!DOCTYPE html>
<html>
  <head>
    <title>Documentation ${title}</title>
    <script>window.msi = ${msi}</script>
    <script>${jsBundle}</script>
  </head>
  <body>
    <div id="container"></div>
  </body>
</html>`;

module.exports = function exportAsHtml(state) {
  return http.get(jsBundleUrl).then((jsBundle) => {
    const { source, uri, name, elements, screenshot } = state;
    const html = serialize(name, jsBundle, JSON.stringify({
      source, uri, name, elements, screenshot
    }));
    const fileName = `${name}.html`;
    save(fileName, html);
    return fileName;
  });
};

function save(fileName, html) {
  const blob = new Blob([ html ], { type: 'text/html;charset=utf-8' });
  FileSaver.saveAs(blob, fileName);
}
