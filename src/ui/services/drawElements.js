const gfx = require('./graphics');

module.exports = function drawElements(elements, imageData) {
  return gfx.asImg(imageData).then((screen) => {
    const canvas = gfx.createCanvas(screen.width, screen.height);

    canvas.ctx.drawImage(screen, 0, 0);

    canvas.ctx.strokeStyle = 'red';
    canvas.ctx.lineWidth = 3;
    elements.forEach((element) => {
      if (element.coords) {
        const { x, y, width, height } = element.coords;
        canvas.ctx.strokeRect(x, y, width, height);
      }
    });

    return canvas.toDataURL();
  });
};
