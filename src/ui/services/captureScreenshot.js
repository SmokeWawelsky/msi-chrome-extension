const communicator = require('../communicator');
const gfx = require('./graphics');

let ID = 0;

module.exports = function captureScreenshot(dimensions) {
  let $p = Promise.resolve();
  const chunks = prepare(dimensions);
  chunks.forEach((chunk) => {
    $p = $p.then(() => capture(chunk));
  });
  return $p.then(() => stitch(chunks, dimensions));
};

function prepare(dimensions) {
  const chunks = [];
  let y = dimensions.fullHeight - dimensions.windowHeight;
  while (y > 0) {
    chunks.push({ y });
    y -= dimensions.windowHeight;
  }
  chunks.push({ y: 0 });
  return chunks;
}

function capture(chunk) {
  const id = ID++;
  return communicator.exchange({
    name: 'scrollTo',
    data: { id, y: chunk.y },
    response: `scrolled:${id}`
  }).then(screenshot).then((data) => {
    chunk.screenshot = data;
  });
}

function screenshot() {
  return new Promise((resolve) => {
    chrome.tabs.captureVisibleTab(null, { format: 'png', quality: 100 }, (dataURI) => {
      resolve(dataURI);
    });
  });
}

function stitch(chunks, dimensions) {
  const canvas = gfx.createCanvas(dimensions.fullWidth, dimensions.fullHeight);
  let $p = Promise.resolve();
  chunks.forEach((chunk) => {
    $p = $p.then(() => gfx.asImg(chunk.screenshot).then((img) => {
      canvas.ctx.drawImage(img, 0, chunk.y, dimensions.windowWidth, dimensions.windowHeight);
    }));
  });
  return $p.then(() => canvas.toDataURL());
}
