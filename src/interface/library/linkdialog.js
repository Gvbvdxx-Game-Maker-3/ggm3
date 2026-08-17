var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var engine = require("../curengine.js");
const { element } = require("../dom/left-libraries.js");
const { update } = require("@tweenjs/tween.js");

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

function doLinkDialog(_options) {
    var resolve = null;
    var reject = null;
    var promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    var options = {
        type: "costume",
        ...options
    };
    var libraryTabsContainer = null;
    var dialogContainer = elements.createElementsFromJSON([
        {
            element: "div",
            children: [
                { element: "div", className: "dialogBackground" },
                {
                    element: "div",
                    className: "centerMiddle linkLibraryDialogBox",
                    children: [
                        {
                            element: "h2",
                            textContent: `Select ${options.type} from library:`,
                            style: {
                                textAlign: "center",
                                flexShrink: "0px",
                            },
                        },
                        {
                            element: "div",
                            className: "tabArea",
                            GPWhenCreated: (e) => libraryTabsContainer = e,
                        },
                        {
                            element: "div",
                            className: "libraryDialogList"
                        }
                    ]
                }
            ]
        }
    ])[0];

    document.body.append(dialogContainer);

    var selectedLibrary = 0;

    function updateTabs() {
        elements.setInnerJSON(
            libraryTabsContainer,
            engine.libraries.map((library, index) => {
                return createTabElementJSON(
                    library.name,
                    "icons/library.svg",
                    () => selectLibrary(index),
                    selectedLibrary == index
                );
            })
        );
    }

    function displayList() {

    }

    function selectLibrary(index) {
        selectedLibrary = index;
        updateTabs();
        displayList();
    }

    selectLibrary(selectedLibrary);
    

    return promise;
}

module.exports = {
    doLinkDialog
};