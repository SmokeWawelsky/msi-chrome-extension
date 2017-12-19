const loadPageObject = require('../services/loadPageObject');
const capturePageInfo = require('../services/capturePageInfo');
const captureScreenshot = require('../services/captureScreenshot');
const drawElements = require('../services/drawElements');

module.exports = {
  loadPageObject(file) {
    loadPageObject(file)
      .then((po) => this.dispatch('didLoadPageObject', po))
      .catch((err) => this.dispatch('failedToLoadPageObject', err));
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
      .then(() => drawElements(po.elements, ctx.screenshot))
      .then((image) => dispatch('didDrawElements', image))
      .catch((err) => dispatch('failedToCapturePage', err));
  },

  export(po, screenshot) {
    console.log('export', po, screenshot);
  }
};
