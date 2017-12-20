const communicator = require('../communicator');
const { asImg, createCanvas } = require('../../common/graphics');

let ID = 0;

module.exports = function captureScreenshot(dimensions) {
  const chunks = prepare(dimensions);
  return chunks
    .reduce(($p, chunk) => {
      return $p.then(() => capture(chunk));
    }, Promise.resolve())
    .then(() => stitch(chunks, dimensions))
    .then((image) => ({
      image, width: dimensions.fullWidth, height: dimensions.fullHeight
    }));
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
  const canvas = createCanvas(dimensions.fullWidth, dimensions.fullHeight);
  return chunks.reduce(($p, chunk) => {
    return $p.then(() => asImg(chunk.screenshot).then((img) => {
      canvas.ctx.drawImage(img, 0, chunk.y, dimensions.windowWidth, dimensions.windowHeight);
    }));
  }, Promise.resolve()).then(() => canvas.toDataURL());
}
