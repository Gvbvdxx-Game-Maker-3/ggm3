var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");

var modeTabsElm = elements.getGPId("modeTabs");

function createTabElementJSON(label, src, whenClick, isSelected) {
  var elm = {
    element: "div",
    className: "tabButton",
    eventListeners: [
      {
        event: "click",
        func: whenClick,
      },
    ],
    GPWhenCreated: function (elm) {
      if (isSelected) {
        elm.setAttribute("selected", "");
      }
    },
    children: [
      {
        element: "img",
        className: "tabIcon",
        src,
      },
      {
        element: "span",
        textContent: label,
      },
    ],
  };
  return {
    element: "div",
    className: "modeTabContainer",
    children: [elm],
  };
}

const modeTabs = [
  {
    label: "Sprites",
    src: "icons/code.svg",
    default: true,
    id: "MODE_SPRITES",
  },
  {
    label: "Libraries",
    src: "icons/brush.svg",
    default: false,
    id: "MODE_LIBRARIES",
  },
];

var currentMode = modeTabs[0].id;
function updateModes() {
  elements.setInnerJSON(
    modeTabsElm,
    modeTabs.map((mode) =>
      createTabElementJSON(
        mode.label,
        mode.src,
        () => switchMode(mode.id),
        currentMode == mode.id,
      ),
    ),
  );
  updateModesVisibility();
}

function switchMode(id) {
  if (currentMode == id) {
    return;
  }
  currentMode = id;
  updateModes();
}

var spritesLeftPanel = elements.getGPId("spritesLeftPanel");
var spritesMode = elements.getGPId("spritesMode");
var spritesTabs = require("./sprites.js");

var libraryMode = elements.getGPId("libraryMode");
var librariesLeftPanel = elements.getGPId("librariesLeftPanel");
var libraryTabs = require("./libraries.js");

function hideEverything() {
  spritesLeftPanel.hidden = true;
  spritesMode.hidden = true;
  spritesTabs.hideEverything();

  libraryMode.hidden = true;
  librariesLeftPanel.hidden = true;
  libraryTabs.hideEverything();
}
function updateModesVisibility() {
  hideEverything();
  if (currentMode == "MODE_SPRITES") {
    spritesLeftPanel.hidden = false;
    spritesMode.hidden = false;
    spritesTabs.updateTabs();
  }
  if (currentMode == "MODE_LIBRARIES") {
    libraryMode.hidden = false;
    librariesLeftPanel.hidden = false;
    libraryTabs.updateTabs();
  }
}

updateModes();

module.exports = {
  hideEverything,
  updateTabs: updateModes,
  updateModes,
};
