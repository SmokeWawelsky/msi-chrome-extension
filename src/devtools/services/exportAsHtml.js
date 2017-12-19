const FileSaver = require('file-saver');
const request = require('../request');

const jsBundleUrl = chrome.extension.getURL('/build/documentation.bundle.js');

const serialize = (title, msi, jsBundle) => `<!DOCTYPE html>
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
  return request(jsBundleUrl).then((jsBundle) => {
    const { dimensions, po, screenshot } = state;
    serializeAndSave({ dimensions, po, screenshot }, jsBundle);
  });
};

function serializeAndSave(msi, jsBundle) {
  const html = serialize(msi.po.name, JSON.stringify(msi), jsBundle);
  const blob = new Blob([ html ], { type: 'text/html;charset=utf-8' });
  FileSaver.saveAs(blob, `${msi.po.name}.html`);
}
