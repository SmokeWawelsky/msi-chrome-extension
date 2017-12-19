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
    this.flux.actions.log.error('Failed to load PageObject:', err);
  },

  onDidLoadPageObject(po) {
    this.po = po.object;
    this.file = po.file.name;
    this.flux.actions.log.info(`Page object '${po.object.name}' loaded from ${po.file.name}`);
    this.emit('change');
  },

  onDidCapturePageInfo(info) {
    this.dimensions = info.dimensions;
    this.flux.actions.log.info('Page dimensions:', JSON.stringify(info.dimensions));
    this.po.elements.forEach((element) => {
      const coords = info.elements[element.name];
      if (coords) element.coords = coords;
      else this.flux.actions.log.warn('Failed to resolve coords of element', JSON.stringify(element));
    });
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
    this.flux.actions.log.error('Failed to capture page:', err);
  }
});
