var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var engine = require("../curengine.js");
var GUIEvents = require("../event.js");

var libraryCostumesHeaderContainer = elements.getGPId(
  "libraryCostumesHeaderContainer",
);
var libraryCostumesSelectorContainer = elements.getGPId(
  "libraryCostumesSelectorContainer",
);
var { makeSortable } = require("../drag-utils.js");

var selectedSprite = require("../selectedsprite.js");

var currentLibrary = null;

function fileInputWithCallback(cb, multiple) {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = ".webp, .png, .bmp, .svg, .jpg, .jpeg";
  input.multiple = multiple;
  input.onchange = async function () {
    cb(input);
  };
  input.click();
}

function createLibraryHeader() {
  function addCostumeFromBlob(blob) {
    var reader = new FileReader();
    reader.onload = function () {
      var src = reader.result;
      currentLibrary.addCostume(src, "Costume", blob.mimeType);
      reloadCostumes();
    };
    reader.readAsDataURL(blob);
  }
  elements.setInnerJSON(libraryCostumesHeaderContainer, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Import Library Costume",
      style: {
        marginRight: "2px",
      },
      eventListeners: [
        {
          event: "click",
          func: function () {
            fileInputWithCallback((input) => {
              if (input.files[0]) {
                for (var file of Array.from(input.files)) {
                  addCostumeFromBlob(file);
                }
              } else {
                input.value = "";
                input.remove();
              }
            }, true);
          },
        },
      ],
    },
  ]);
}

function reloadCostumes() {
  if (currentLibrary.costumes.length < 1) {
    elements.setInnerJSON(libraryCostumesSelectorContainer, [
      {
        element: "span",
        textContent: "This library has no costumes.",
        style: {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    ]);
  }
  elements.setInnerJSON(
    libraryCostumesSelectorContainer,
    currentLibrary.costumes.map((costume, index) => {
      return {
        element: "div",
        className: "costumeContainer",
        children: [
          {
            element: "img",
            src: costume.src,
            className: "costumeLibraryImg"
          },
          {
            element: "input",
            value: costume.name,
            className: "selectedCostumeInput",
            eventListeners: [
              {
                event: "change",
                func: function () {
                  costume.name = this.value.trim();
                  costume.library.checkUniqueNames();
                  reloadCostumes();
                  selectedSprite.markProjectDirty();
                },
              },
            ],
          },
          {
            element: "button",
            className: "greyButtonStyle",
            textContent: "Delete",
            style: {
              marginRight: "2px",
              fontSize: "12px",
            },
            eventListeners: [
              {
                event: "click",
                func: function () {
                  var library = costume.library;
                  library.removeCostume(costume);
                  reloadCostumes();
                  selectedSprite.markProjectDirty();
                },
              },
            ],
          },
          {
            element: "button",
            className: "greyButtonStyle",
            textContent: "Replace",
            style: {
              marginRight: "2px",
              fontSize: "12px",
            },
            eventListeners: [
              {
                event: "click",
                func: function () {
                  var library = costume.library;
                  fileInputWithCallback((input) => {
                    if (input.files[0]) {
                      var reader = new FileReader();
                      reader.onload = function () {
                        var src = reader.result;
                        costume.src = src;
                        engine.reloadSpriteCostumesFromLibraryCostume(costume);
                        reloadCostumes();
                        GUIEvents.emit(GUIEvents.LIBRARY_COSTUME_UPDATED, costume);
                      };
                      reader.readAsDataURL(input.files[0]);
                    } else {
                      input.value = "";
                      input.remove();
                    }
                  }, false);
                },
              },
            ],
          },
        ],
      };
    }),
  );
}

function setCurrentLibrary(lib) {
  currentLibrary = lib;
  createLibraryHeader();
  reloadCostumes();

  makeSortable(
    libraryCostumesSelectorContainer,
    ".costumeContainer",
    (oldIndex, newIndex) => {
      if (oldIndex === newIndex) return;

      var toMove = currentLibrary.costumes[oldIndex];
      currentLibrary.costumes.splice(oldIndex, 1);
      currentLibrary.costumes.splice(newIndex, 0, toMove);
      reloadCostumes();
    },
  );
}

module.exports = {
  setCurrentLibrary,
};
