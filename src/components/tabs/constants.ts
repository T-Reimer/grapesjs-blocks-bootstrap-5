const prefix = 'tabs-';
const containerName = `${prefix}container`;
const navigationName = `${prefix}navigation`;
const tabPanesName = `${prefix}panes`;
const tabName = `${prefix}tab`;
const tabPaneName = `${prefix}tab-pane`;

export default {
  navigationName,
  tabPanesName,
  tabName,
  tabPaneName,

  // Selectors
  navigationSelector: `[data-bs-gjs-type="${navigationName}"]`,
  tabPanesSelector: `[data-bs-gjs-type="${tabPanesName}"]`,
  tabSelector: `[data-bs-gjs-type="${tabName}"]`,
  tabPaneSelector: `[data-bs-gjs-type="${tabPaneName}"]`,

  // IDs
  containerId: `data-bs-${containerName}`,
  navigationId: `data-bs-${navigationName}`,
  tabPanesId: `data-bs-${tabPanesName}`,
  tabId: `data-bs-${tabName}`,
  tabPaneId: `data-bs-${tabPaneName}`,
}
