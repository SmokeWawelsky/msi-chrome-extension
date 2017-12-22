const { asImg, createCanvas } = require('../../common/graphics');

const cache = {};

function getCanvas(index) {
  return cached(index, () => {
    const screenshot = window.msi.pages[index].screenshot;
    const canvas = createCanvas(screenshot.width, screenshot.height);
    return asImg(screenshot.image).then((image) => {
      canvas.ctx.drawImage(image, 0, 0);
      return canvas;
    });
  });
}

function cutImage(index, coords) {
  return cached(index + JSON.stringify(coords), () => {
    return getCanvas(index).then((canvas) => {
      const idata = canvas.ctx.getImageData(coords.x, coords.y, coords.width, coords.height);
      const icanvas = createCanvas(coords.width, coords.height);
      icanvas.ctx.putImageData(idata, 0, 0);
      return asImg(icanvas.toDataURL());
    });
  });
}

const highlighted = {};

exports.highlight = function(index, coords) {
  cutImage(index, coords).then((img) => {
    const simage = document.getElementById(`screenshot-${index}`);
    const ratio = simage.width / window.msi.pages[index].screenshot.width;
    const px = (x) => Math.round(x * ratio) + 'px';

    img.style.position = 'absolute';
    img.style.top = px(coords.y);
    img.style.left = px(coords.x);
    img.style.width = px(coords.width);
    img.style.height = px(coords.height);

    if (highlighted[index]) {
      simage.parentNode.removeChild(highlighted[index]);
    } else {
      simage.style.opacity = 0.3;
    }
    simage.parentNode.appendChild(img);
    highlighted[index] = img;
  });
};

exports.reset = function(index) {
  if (highlighted[index]) {
    const simage = document.getElementById(`screenshot-${index}`);
    simage.parentNode.removeChild(highlighted[index]);
    simage.style.opacity = 1;
    delete highlighted[index];
  }
};

function cached(key, factory) {
  if (cache[key]) return Promise.resolve(cache[key]);
  return factory().then((object) => cache[key] = object);
}
