const { asImg, createCanvas } = require('../../common/graphics');

const canvas = createCanvas(window.msi.screenshot.width, window.msi.screenshot.height);
const $ready = asImg(window.msi.screenshot.image)
  .then((image) => canvas.ctx.drawImage(image, 0, 0));

exports.cutImage = function(coords) {
  return $ready.then(() => {
    const idata = canvas.ctx.getImageData(coords.x, coords.y, coords.width, coords.height);
    const icanvas = createCanvas(coords.width, coords.height);
    icanvas.ctx.putImageData(idata, 0, 0);
    return asImg(icanvas.toDataURL());
  });
};

let highlighted = null;

exports.highlight = function(coords) {
  exports.cutImage(coords).then((img) => {
    const screenshot = document.getElementById('screenshot')
    const ratio = screenshot.width / window.msi.screenshot.width;
    const px = (x) => Math.round(x * ratio) + 'px';

    img.style.position = 'relative';
    img.style.top = px(coords.y);
    img.style.left = px(coords.x);
    img.style.width = px(coords.width);
    img.style.height = px(coords.height);

    if (highlighted) {
      document.body.removeChild(highlighted);
    } else {
      screenshot.style.opacity = 0.3;
    }
    document.body.appendChild(img);
    highlighted = img;
  });
};

exports.reset = function() {
  if (highlighted) {
    document.body.removeChild(highlighted);
    document.getElementById('screenshot').style.opacity = 1;
    highlighted = null;
  }
};
