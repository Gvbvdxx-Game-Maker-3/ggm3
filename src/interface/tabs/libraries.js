var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var { createTabElementJSON } = require("./_util.js");

var panel = elements.getGPId("librariesLeftPanel");
var tabArea = elements.getGPId("tabLibrariesArea");

const tabs = [
  {
    label: "Graphics",
    src: "icons/brush.svg",
    default: true,
    id: "GRAPHICS",
  },
  {
    label: "Sounds & Music",
    src: "icons/speaker.svg",
    default: true,
    id: "SOUNDS",
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

var library = require("../library");

function hideEverything() {
  //Hide every window here.
}
function updateTabVisibility() {
  hideEverything();
  if (currentTab == "GRAPHICS") {
  }
  if (currentTab == "SOUNDS") {
  }
}

updateTabs();

module.exports = {
  hideEverything,
  updateTabs,
};
