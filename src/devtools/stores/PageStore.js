const Fluxxor = require('fluxxor');

module.exports = Fluxxor.createStore({
  actions: {
    'failedToLoadPageObject': 'onFailedToLoadPageObject',
    'didLoadPageObject': 'onDidLoadPageObject',
    'didCapturePageInfo': 'onDidCapturePageInfo',
    'didCaptureScreenshot': 'onDidCaptureScreenshot',
    'failedToCaptureScreenshot': 'onFailedToCaptureScreenshot',
    'didExportAsHtml': 'onDidExportAsHtml',
    'failedToExportAsHtml': 'onFailedToExportAsHtml'
  },

  onDidLoadPageObject(data) {
    this.source = data.file.name;
    Object.assign(this, data.po);
    this.info = this.screenshot = false;
    this.flux.actions.log.info(`Page object '${this.name}' loaded from ${this.source}`);
    this.emit('change');
  },
  onFailedToLoadPageObject(err) {
    this.flux.actions.log.error('Failed to load PageObject:', err);
  },

  onDidCapturePageInfo(data) {
    this.info = data.info;
    this.uri = data.info.uri;
    this.flux.actions.log.info('Page info:', JSON.stringify(this.info));
    this.elements.forEach((element) => {
      const coords = data.elements[element.name];
      if (coords) element.coords = coords;
      else this.flux.actions.log.warn('Failed to resolve coords of element', JSON.stringify(element));
    });
    this.emit('change');
  },

  onDidCaptureScreenshot(data) {
    this.screenshot = data;
    this.flux.actions.log.info(`Screenshot captured (${data.width}x${data.height})`);
    this.emit('change');
  },
  onFailedToCaptureScreenshot(err) {
    this.flux.actions.log.error('Failed to capture screenshot:', err);
  },

  onDidExportAsHtml(file) {
    this.flux.actions.log.info('Exported as', file);
  },
  onFailedToExportAsHtml(err) {
    this.flux.actions.log.error('Failed to export as html:', err);
  }
});
