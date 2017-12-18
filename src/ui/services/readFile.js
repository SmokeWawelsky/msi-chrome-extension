module.exports = function readFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = (e) => resolve(e.target.result);
    reader.readAsText(file);
  });
};
