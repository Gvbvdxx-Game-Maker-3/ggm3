
var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");

var modeTabsElm = elements.getGPId("modeTabs");

function createTabElementJSON(label, src, whenClick, isSelected) {
  return {
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

