const Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
  actions: {
    'failedToLoadPageObject': 'onFailedToLoadPageObject',
    'didLoadPageObject': 'onDidLoadPageObject',
    'didCapturePageInfo': 'onDidCapturePageInfo',
    'didCaptureScreenshot': 'onDidCaptureScreenshot',
    'didDrawElements': 'onDidDrawElements',
    'failedToCapturePage': 'onFailedToCapturePage'
  },

  onFailedToLoadPageObject(err) {
    console.error('Failed to load PageObject:', err);
  },

  onDidLoadPageObject(po) {
    this.po = po.object;
    this.file = po.file.name;
    this.emit('change');
  },

  onDidCapturePageInfo(info) {
    this.info = info;
    this.emit('change');
  },

  onDidCaptureScreenshot(screenshot) {
    this.screenshot = screenshot.screenshot;
    this.emit('change');
  },

  onDidDrawElements(image) {
    this.result = image;
    this.emit('change');
  },

  onFailedToCapturePage(err) {
    console.error('Failed to capture page:', err);
  }
});
