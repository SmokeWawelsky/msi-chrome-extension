const gfx = require('./graphics');

module.exports = function drawElements(elements, imageData) {
  return gfx.asImg(imageData).then((screen) => {
    const canvas = gfx.createCanvas(screen.width, screen.height);

    canvas.ctx.drawImage(screen, 0, 0);

    canvas.ctx.strokeStyle = 'red';
    canvas.ctx.lineWidth = 3;
    elements.forEach((coords) => canvas.ctx.strokeRect(coords.x, coords.y, coords.width, coords.height));

    return canvas.toDataURL();
  });
};
