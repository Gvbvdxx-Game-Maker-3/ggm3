var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");

var costumesContainer = elements.getGPId("costumesContainer");
var costumesHeaderContainer = elements.getGPId("costumesHeaderContainer");
var costumesSelectorContainer = elements.getGPId("costumesSelectorContainer");

var costumePivots = require("./costumepivoteditor.js");

var library = require("./library/linkdialog.js");
var librarySelection = require("./library/selection.js");

var { makeSortable } = require("./drag-utils.js");

var deps = {
  markAsDirty: () => {},
  forwardMarkAsDirty: function () {
    costumePivots.deps.markAsDirty = deps.markAsDirty;
  },
};

function reloadCostumes(spr, reloadTabCallback = function () {}) {
  costumePivots.reloadCostumes(spr, reloadTabCallback);
  elements.setInnerJSON(costumesHeaderContainer, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Import",
      style: {
        marginRight: "2px",
      },
      eventListeners: [
        {
          event: "click",
          func: function () {
            var input = document.createElement("input");
            input.type = "file";
            input.accept = ".webp, .png, .bmp, .svg, .jpg, .jpeg";
            input.multiple = true;
            input.onchange = async function () {
              if (input.files[0]) {
                var p = [];
                for (var _file of input.files) {
                  function load(file) {
                    return new Promise((resolve) => {
                      var reader = new FileReader();
                      reader.onload = async function () {
                        input.value = "";
                        input.remove();

                        try {
                          var costume = await spr.addCostume(reader.result);
                          costume.mimeType = file.type;
                          costume.name = file.name
                            .split(".")
                            .slice(0, file.name.split(".").length - 1)
                            .join(".")
                            .trim();
                          spr.ensureUniqueCostumeNames();
                          resolve();
                          reloadCostumes(spr);
                          deps.markAsDirty();
                        } catch (e) {
                          window.alert(e);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                  p.push(load(_file));
                }
                Promise.all(p).then(() => {
                  reloadTabCallback(spr);
                });
              } else {
                input.value = "";
                input.remove();
              }
            };
            input.click();
          },
        },
      ],
    },

    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Add from library",
      style: {
        marginRight: "2px",
      },
      eventListeners: [
        {
          event: "click",
          func: function () {
            library
              .doLinkDialog({
                type: "costume",
              })
              .then(async (result) => {
                if (!result) {
                  return;
                }
                var costume = await spr.addCostume(result.object);
                costume.mimeType = result.mimeType;
                costume.name = result.name;
                spr.ensureUniqueCostumeNames();
                reloadCostumes(spr);
                deps.markAsDirty();
              });
          },
        },
      ],
    },
  ]);
  if (spr.costumes.length < 1) {
    elements.setInnerJSON(costumesSelectorContainer, [
      {
        element: "span",
        textContent: "This sprite has no costumes.",
        style: {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    ]);
  } else {
    var previousScrollTop = costumesSelectorContainer.scrollTop;
    var previousScrollLeft = costumesSelectorContainer.scrollLeft;
    elements.setInnerJSON(
      costumesSelectorContainer,
      spr.costumes.map((costume, i) => {
        return {
          element: "div",
          className: "costumeContainer",
          children: [
            {
              element: "img",
              src: costume.getSrc(),
              className: "costumeLibraryImg",
              style: {
                width: "70px",
                height: "70px",
                objectFit: "contain",
              },
            },
            {
              element: "img",
              hidden: !costume.linkID, //Only show if this is linked to a library.
              className: "libraryLinkIcon",
              src: "icons/library.svg",
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
                    spr.ensureUniqueCostumeNames();
                    reloadCostumes(spr);
                    reloadTabCallback(spr);
                    deps.markAsDirty();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Add & convert to library",
              hidden: !!costume.linkID,
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    var selectedLibrary = librarySelection.getCurrentLibrary();
                    if (!selectedLibrary) {
                      window.alert(
                        "No selected library. Select a library in the Library tab first.",
                      );
                      return;
                    }

                    var libCostume = selectedLibrary.addCostume(
                      costume.getSrc(),
                      costume.name,
                      costume.mimeType || "image/png",
                    );
                    costume.linkID = libCostume.id;
                    costume.mimeType = libCostume.mimeType;
                    costume.dataURL = null;
                    costume.deloadCostume();
                    costume.loadCostume();

                    librarySelection.refreshCurrentLibrary();

                    reloadCostumes(spr);
                    reloadTabCallback(spr);
                    deps.markAsDirty();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Switch",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    spr.costumeIndex = i;
                    deps.markAsDirty();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              GPWhenCreated: function (elm) {
                if (costume.willPreload) {
                  elm.textContent = "Disable preloading";
                } else {
                  elm.textContent = "Enable preloading";
                }
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    costume.willPreload = !costume.willPreload;
                    if (costume.willPreload) {
                      this.textContent = "Disable preloading";
                    } else {
                      this.textContent = "Enable preloading";
                    }
                    deps.markAsDirty();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Load",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    costume.loadCostume();
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Deload",
              style: {
                marginRight: "2px",
                fontSize: "12px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function () {
                    costume.deloadCostume();
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
                    spr.deleteCostume(costume);
                    reloadCostumes(spr);
                    reloadTabCallback(spr);
                    deps.markAsDirty();
                  },
                },
              ],
            },
          ],
        };
      }),
    );
    costumesSelectorContainer.scrollTop = previousScrollTop;
    costumesSelectorContainer.scrollLeft = previousScrollLeft;

    makeSortable(
      costumesSelectorContainer,
      ".costumeContainer",
      (oldIndex, newIndex) => {
        // This callback runs only when the user releases the mouse
        // and the order has actually changed.

        if (oldIndex === newIndex) return;

        // 1. Move data in the engine
        var costumeToMove = spr.costumes[oldIndex];
        spr.costumes.splice(oldIndex, 1);
        spr.costumes.splice(newIndex, 0, costumeToMove);

        spr.costumeIndex = spr.costumes.indexOf(spr.costumes[spr.costumeIndex]);

        spr.ensureUniqueCostumeNames();

        reloadCostumes(spr);
        reloadTabCallback(spr);
        deps.markAsDirty();
      },
    );
  }
}

module.exports = {
  reloadCostumes,
  deps,
};
