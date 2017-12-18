exports.asImg = function(dataURI) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = dataURI;
  });
};

exports.createCanvas = function(w, h) {
  const canvas = window.document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.ctx = canvas.getContext('2d');
  return canvas;
}
