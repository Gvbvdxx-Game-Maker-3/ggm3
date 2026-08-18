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
    ..._options,
  };
  var libraryTabsContainer = null;
  var libraryDialogList = null;
  var libraryDialogButtons = null;
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
              GPWhenCreated: (e) => (libraryTabsContainer = e),
            },
            {
              element: "div",
              className: "libraryDialogList",
              GPWhenCreated: (e) => (libraryDialogList = e),
            },
            {
              element: "div",
              className: "libraryDialogButtons",
              GPWhenCreated: (e) => (libraryDialogButtons = e),
            },
          ],
        },
      ],
    },
  ])[0];

  document.body.append(dialogContainer);

  var selectedLibrary = 0;
  var selectedOption = -1;
  var selectedOptionObject = null;

  function updateTabs() {
    elements.setInnerJSON(
      libraryTabsContainer,
      engine.libraries.map((library, index) => {
        return createTabElementJSON(
          library.name,
          "icons/library.svg",
          () => selectLibrary(index),
          selectedLibrary == index,
        );
      }),
    );
  }

  var listName = options.type == "costume" ? "costumes" : "sounds";

  function displayList() {
    var list = engine.libraries[selectedLibrary][listName];
    if (list.length < 1) {
      elements.setInnerJSON(libraryDialogList, [
        {
          element: "span",
          textContent:
            "This library has no " +
            (options.type == "costume" ? "costumes" : "sounds") +
            ".",
          style: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            padding: "4px 4px",
          },
        },
      ]);
    }
    elements.setInnerJSON(
      libraryDialogList,

      list.map((opt) => {
        return {
          element: "div",
          className: "libraryOption",
          GPWhenCreated: function (elm) {
            if (selectedOption == opt.id) {
              elm.setAttribute("selected", "");
            }
          },
          eventListeners: [
            {
              event: "click",
              func: function () {
                selectedOption = opt.id;
                selectedOptionObject = opt;
                displayList();
              },
            },
          ],
          children: [
            options.type == "costume"
              ? //Costume
                {
                  element: "img",
                  className: "costumeLibraryImg",
                  src: opt.src,
                }
              : //Sound
                {
                  element: "img",
                  className: "costumeLibraryImg",
                  src: "icons/speaker.svg",
                },
            {
              element: "span",
              textContent: opt.name,
            },
          ],
        };
      }),
    );
  }

  function selectLibrary(index) {
    selectedLibrary = index;
    updateTabs();
    displayList();
  }

  selectLibrary(selectedLibrary);

  function cancel() {
    resolve();
    dialogContainer.remove();
  }

  function ok() {
    if (!selectedOptionObject) {
      resolve();
      dialogContainer.remove();
      return;
    }

    resolve({
      id: selectedOption,
      object: selectedOptionObject,
      name: selectedOptionObject.name,
    });
    dialogContainer.remove();
  }

  elements.appendElementsFromJSON(libraryDialogButtons, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "OK",
      eventListeners: [
        {
          event: "click",
          func: ok,
        },
      ],
    },
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Cancel",
      eventListeners: [
        {
          event: "click",
          func: cancel,
        },
      ],
    },
  ]);

  return promise;
}

module.exports = {
  doLinkDialog,
};
