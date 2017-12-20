const { asImg, createCanvas } = require('../../common/graphics');

module.exports = function drawElements(elements, imageData) {
  return asImg(imageData).then((screen) => {
    const canvas = createCanvas(screen.width, screen.height);

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
