const { openProject, saveProject } = require('../services/projectPersistence');
const loadPageObject = require('../services/loadPageObject');
const capturePageInfo = require('../services/capturePageInfo');
const captureScreenshot = require('../services/captureScreenshot');
const exportAsHtml = require('../services/exportAsHtml');

const acts = exports.names = {
  DID_OPEN_PROJECT: 'didOpenProject',
  DID_SAVE_PROJECT: 'didSaveProject',

  UPDATE_NAME: 'updateName',

  UPDATE_PAGE_NAME: 'updatePageName',
  UPDATE_PAGE_INDEX: 'updatePageIndex',
  REMOVE_PAGE: 'removePage',

  PAGE_SELECTED: 'pageSelected',

  DID_LOAD_PAGE_OBJECT: 'didLoadPageObject',
  FAILED_TO_LOAD_PAGE_OBJECT: 'failedToLoadPageObject',
  DID_CAPTURE_PAGE_INFO: 'didCapturePageInfo',
  DID_CAPTURE_PAGE_SCREENSHOT: 'didCapturePageScreenshot',
  FAILED_TO_CAPTURED_PAGE: 'failedToCapturePage',

  DID_EXPORT: 'didExport',
  FAILED_TO_EXPORT: 'failedToExport'
};

exports.actions = {
  openProject(file) {
    openProject(file)
      .then((project) => this.dispatch(acts.DID_OPEN_PROJECT, project));
  },
  saveProject(project) {
    saveProject(project)
      .then((name) => this.dispatch(acts.DID_SAVE_PROJECT, name));
  },

  updateName(name) {
    this.dispatch(acts.UPDATE_NAME, name);
  },

  appendPage(file) {
    loadPageObject(file)
      .then((po) => this.dispatch(acts.DID_LOAD_PAGE_OBJECT, { file, po }))
      .catch((err) => this.dispatch(acts.FAILED_TO_LOAD_PAGE_OBJECT, err));
  },
  updatePageName(index, name) {
    const page = this.flux.store('ProjectStore').getPage(index);
    this.dispatch(acts.UPDATE_PAGE_NAME, { page, index, name });
  },
  updatePageIndex(index, newIndex) {
    const page = this.flux.store('ProjectStore').getPage(index);
    this.dispatch(acts.UPDATE_PAGE_INDEX, { page, oldIndex: index, newIndex });
  },
  removePage(index) {
    const page = this.flux.store('ProjectStore').getPage(index);
    this.dispatch(acts.REMOVE_PAGE, { page, index });
  },

  pageSelected(index) {
    this.dispatch(acts.PAGE_SELECTED, index);
  },

  capturePage(index) {
    const page = this.flux.store('ProjectStore').getPage(index);
    Promise.resolve(page)
      .then((data) => capturePageInfo(data.elements))
      .then((data) => {
        this.dispatch(acts.DID_CAPTURE_PAGE_INFO, Object.assign({ page, index }, data));
        return data;
      })
      .then((data) => captureScreenshot(data.info))
      .then((data) => {
        this.dispatch(acts.DID_CAPTURE_PAGE_SCREENSHOT, Object.assign({ page, index }, data));
      })
      .catch((err) => this.dispatch(acts.FAILED_TO_CAPTURED_PAGE, err));
  },

  exportHtml(project) {
    exportAsHtml(project)
      .then((file) => this.dispatch(acts.DID_EXPORT, file))
      .catch((err) => this.dispatch(acts.FAILED_TO_EXPORT, err));
  }
};
