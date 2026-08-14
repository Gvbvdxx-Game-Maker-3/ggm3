
var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var {createTabElementJSON} = require("./util.js");

var panel = elements.getGPId("templateLeftPanel");
var tabArea = elements.getGPId("tabTemplateArea");

const tabs = [
  {
    label: "Tab",
    src: "icons/code.svg",
    default: true,
    id: "TAB",
  },
];

var currentTab = tabs[0].id;
function updateTabs() {
  elements.setInnerJSON(
    tabArea,
    tabs.map((tab) =>
      createTabElementJSON(
        tab.label,
        tab.src,
        () => switchTab(tab.id),
        currentTab == tab.id,
      ),
    ),
  );
  updateTabVisibility();
}

function switchTab(id) {
  if (currentTab == id) {
    return;
  }
  currentTab = id;
  updateTabs();
}

function hideEverything() {
  //Hide every window here.
}
function updateTabVisibility() {
    hideEverything();
    if (currentMode == "TAB") {
        //Show everything you need for this specific tab.
    }
    
}

updateTabs();

module.exports = {
    hideEverything,
    updateTabs
};