
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
    children: [elm]
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
  }
];

var currentMode = tabs[0].id;
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

var spritesMode = elements.getGPId("spritesMode");
var libraryMode = elements.getGPId("libraryMode");
function hideEverything() {
  
}
function updateModesVisibility() {

}

updateModes();

module.exports = {
    hideEverything,
    updateTabs: updateModes,
    updateModes
};