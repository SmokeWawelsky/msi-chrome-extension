const http = require('../../common/http');
const { saveFile } = require('./fileOperations');

const jsBundleUrl = chrome.extension.getURL('/build/documentation.bundle.js');

const mime = 'text/html;charset=utf-8';

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

module.exports = function exportAsHtml(project) {
  return http.get(jsBundleUrl).then((jsBundle) => {
    const html = serialize(project.name, jsBundle, msi(project));
    return saveFile(`${project.name}.html`, mime, html);
  });
};

function msi(project) {
  return JSON.stringify({
    name: project.name,
    pages: project.pages.map((page) => ({
      name: page.name,
      source: page.source,
      uri: page.info.uri,
      elements: page.elements,
      screenshot: page.screenshot
    }))
  }, null, 2);
}
