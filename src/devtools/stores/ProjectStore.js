const Fluxxor = require('fluxxor');

const acts = require('../actions/ProjectActions').names;

module.exports = Fluxxor.createStore({
  actions: {
    [acts.DID_OPEN_PROJECT]: 'onDidOpenProject',
    [acts.DID_SAVE_PROJECT]: 'onDidSaveProject',
    [acts.UPDATE_NAME]: 'onUpdateName',
    [acts.UPDATE_PAGE_NAME]: 'onUpdatePageName',
    [acts.UPDATE_PAGE_INDEX]: 'onUpdatePageIndex',
    [acts.REMOVE_PAGE]: 'onRemovePage',
    [acts.PAGE_SELECTED]: 'onPageSelected',
    [acts.DID_LOAD_PAGE_OBJECT]: 'onDidLoadPageObject',
    [acts.FAILED_TO_LOAD_PAGE_OBJECT]: 'onFailedToLoadPageObject',
    [acts.DID_CAPTURE_PAGE_INFO]: 'onDidCapturePageInfo',
    [acts.DID_CAPTURE_PAGE_SCREENSHOT]: 'onDidCaptureScreenshot',
    [acts.FAILED_TO_CAPTURED_PAGE]: 'onFailedToCapturePage',
    [acts.DID_EXPORT]: 'onDidExport',
    [acts.FAILED_TO_EXPORT]: 'onFailedToExport'
  },

  initialize() {
    this.name = '';
    this.pages = [];
    this.pageIndex = 0;
    this.modified = false;
    this.exportable = false;
  },

  onDidOpenProject(project) {
    Object.assign(this, project);
    this.pageIndex = 0;
    this.modified = false;
    this.exportable = this.isProjectExportable();
    this.flux.actions.log.info(`Project '${project.name}' opened.`);
    this.emit('change');
  },
  onDidSaveProject(name) {
    this.flux.actions.log.info('Project saved to', name);
  },

  onUpdateName(name) {
    this.name = name;
    this.modified = true;
    this.exportable = this.isProjectExportable();
    this.emit('change');
  },

  onUpdatePageName(data) {
    const oldName = data.page.name;
    data.page.name = data.name;
    this.flux.actions.log.info(`Page (${data.index}) name updated ('${oldName}' -> '${data.name}').`);
    this.modified = true;
    this.emit('change');
  },
  onUpdatePageIndex(data) {
    const cloned = this.pages.slice();
    cloned.splice(data.index, 1);
    cloned.splice(data.newIndex, 0, data.page);
    this.pages = cloned;
    this.flux.actions.log.info(`Page '${data.page.name}' index updated (${data.index} -> ${data.newIndex}).`);
    this.modified = true;
    this.emit('change');
  },
  onRemovePage(data) {
    this.pages.splice(data.index, 1);
    this.flux.actions.log.info(`Page (${data.index}) '${data.page.name}' removed.`);
    if (data.index < this.pageIndex) {
      this.pageIndex--;
    }
    this.modified = true;
    this.exportable = this.isProjectExportable();
    this.emit('change');
  },

  onPageSelected(index) {
    this.pageIndex = index;
    this.emit('change');
  },

  onDidLoadPageObject(data) {
    const page = data.po;
    page.source = data.file.name;
    this.flux.actions.log.info(`Page object '${page.name}' loaded from ${page.source}.`);
    this.pages.push(page);
    const index = this.pages.length - 1;
    this.pageIndex = index;
    this.flux.actions.log.info(`Page added at index ${index}.`);
    this.modified = true;
    this.exportable = false;
    this.emit('change');
  },
  onFailedToLoadPageObject(err) {
    this.flux.actions.log.error('Failed to load page object:', err);
  },

  onDidCapturePageInfo(data) {
    data.page.info = data.info;
    this.flux.actions.log.info(`Page (${data.index}) '${data.page.name}' info:`, JSON.stringify(data.info));
    data.page.elements.forEach((element) => {
      const coords = data.elements[element.name];
      if (coords) element.coords = coords;
      else this.flux.actions.log.warn('Failed to resolve coords of element', JSON.stringify(element));
    });
    this.modified = true;
    this.emit('change');
  },
  onDidCaptureScreenshot(data) {
    const { image, width, height } = data;
    data.page.screenshot = { image, width, height };
    this.flux.actions.log.info(`Page (${data.index}) '${data.page.name}' screenshot captured (${data.width}x${data.height})`);
    this.modified = true;
    this.exportable = this.isProjectExportable();
    this.emit('change');
  },
  onFailedToCapturePage(err) {
    this.flux.actions.log.error('Failed to capture page:', err);
  },

  onDidExport(file) {
    this.flux.actions.log.info('Exported as', file);
    // this.modified = false;
    this.emit('change');
  },
  onFailedToExport(err) {
    this.flux.actions.log.error('Failed to export:', err);
  },

  getPage(index) {
    return this.pages[index];
  },
  isPageExportable(page) {
    return page.info && page.screenshot;
  },
  isProjectExportable() {
    return this.name.length &&
      this.pages.length &&
      this.pages.every(this.isPageExportable);
  }
});
