var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var engine = require("../curengine.js");
var GUIEvents = require("../event.js");

var librarySoundsHeaderContainer = elements.getGPId(
  "librarySoundsHeaderContainer",
);
var librarySoundsSelectorContainer = elements.getGPId(
  "librarySoundsSelectorContainer",
);
var { makeSortable } = require("../drag-utils.js");

var currentLibrary = null;

function markProjectDirty() {
  GUIEvents.emit(GUIEvents.MARK_PROJECT_DIRTY);
}

function fileInputWithCallback(cb, multiple) {
  var input = document.createElement("input");
  input.type = "file";
  input.accept = "audio/*";
  input.multiple = multiple;
  input.onchange = async function () {
    cb(input);
  };
  input.click();
}

function createLibraryHeader() {
  function addSoundFromBlob(blob) {
    var reader = new FileReader();
    reader.onload = function () {
      var src = reader.result;
      var n = ("" + blob.name).split(".");
      n.pop();
      var n2 = n.join(".");
      var sound = currentLibrary.addSound(src, n2 || "Sound", blob.type);
      reloadSounds();
      markProjectDirty();
      GUIEvents.emit(GUIEvents.REFRESH_SPRITE_SOUNDS);
    };
    reader.readAsDataURL(blob);
  }
  elements.setInnerJSON(librarySoundsHeaderContainer, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Import Library Sound",
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
                  addSoundFromBlob(file);
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

function reloadSounds() {
  if (currentLibrary.sounds.length < 1) {
    elements.setInnerJSON(librarySoundsSelectorContainer, [
      {
        element: "span",
        textContent: "This library has no sounds.",
        style: {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    ]);
  }
  elements.setInnerJSON(
    librarySoundsSelectorContainer,
    currentLibrary.sounds.map((sound, index) => {
      return {
        element: "div",
        className: "soundContainer",
        children: [
          {
            element: "audio",
            src: sound.src,
            controls: true,
          },
          {
            element: "div",
            style: {
              display: "flex",
              flexDirection: "row",
            },
            children: [
              {
                element: "input",
                value: sound.name,
                className: "selectedCostumeInput",
                eventListeners: [
                  {
                    event: "change",
                    func: function () {
                      sound.name = this.value.trim();
                      sound.library.checkUniqueNames();
                      reloadSounds();
                      markProjectDirty();
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
                      var library = sound.library;
                      library.removeSound(sound);
                      reloadSounds();
                      markProjectDirty();
                      GUIEvents.emit(GUIEvents.REFRESH_SPRITE_SOUNDS);
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
                      var library = sound.library;
                      fileInputWithCallback((input) => {
                        if (input.files[0]) {
                          var reader = new FileReader();
                          reader.onload = function () {
                            var src = reader.result;
                            sound.src = src;
                            engine.reloadSpriteSoundsFromLibrarySound(sound);
                            reloadSounds();
                            markProjectDirty();
                            GUIEvents.emit(GUIEvents.REFRESH_SPRITE_SOUNDS);
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
          },
        ],
      };
    }),
  );
}

function setCurrentLibrary(lib) {
  currentLibrary = lib;
  createLibraryHeader();
  reloadSounds();

  makeSortable(
    librarySoundsSelectorContainer,
    ".soundContainer",
    (oldIndex, newIndex) => {
      if (oldIndex === newIndex) return;

      var toMove = currentLibrary.sounds[oldIndex];
      currentLibrary.sounds.splice(oldIndex, 1);
      currentLibrary.sounds.splice(newIndex, 0, toMove);
      reloadSounds();
    },
  );
}

module.exports = {
  setCurrentLibrary,
};
