const loadPageObject = require('../services/loadPageObject');
const capturePageInfo = require('../services/capturePageInfo');
const captureScreenshot = require('../services/captureScreenshot');
const drawElements = require('../services/drawElements');

module.exports = {
  loadPageObject(file) {capturePageInfo
    loadPageObject(file)
      .catch((err) => this.dispatch('failedToLoadPageObject', err))
      .then((po) => this.dispatch('didLoadPageObject', po));
  },

  capturePage(po) {
    const ctx = {};
    const dispatch = (event, data) => {
      Object.assign(ctx, data);
      this.dispatch(event, data);
    };
    capturePageInfo(po)
      .then((info) => dispatch('didCapturePageInfo', info))
      .then(() => captureScreenshot(ctx.dimensions))
      .then((screenshot) => dispatch('didCaptureScreenshot', { screenshot }))
      .then(() => drawElements(ctx.elements, ctx.screenshot))
      .then((image) => dispatch('didDrawElements', image))
      .catch((err) => dispatch('failedToCapturePage', err));
  }
};
