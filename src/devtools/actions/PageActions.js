const loadPageObject = require('../services/loadPageObject');
const capturePageInfo = require('../services/capturePageInfo');
const captureScreenshot = require('../services/captureScreenshot');
const exportAsHtml = require('../services/exportAsHtml');

module.exports = {
  loadPageObject(file) {
    loadPageObject(file)
      .then((po) => this.dispatch('didLoadPageObject', { file, po }))
      .catch((err) => this.dispatch('failedToLoadPageObject', err));
  },

  capturePage(elements) {
    const dispatch = (event, data) => {
      this.dispatch(event, data);
      return data;
    };
    capturePageInfo(elements)
      .then((data) => dispatch('didCapturePageInfo', data))
      .then((data) => captureScreenshot(data.info))
      .then((data) => dispatch('didCaptureScreenshot', data))
      .catch((err) => dispatch('failedToCaptureScreenshot', err));
  },

  export(state) {
    exportAsHtml(state)
      .then((file) => this.dispatch('didExportAsHtml', file))
      .catch((err) => this.dispatch('failedToExportAsHtml', err));
  }
};
