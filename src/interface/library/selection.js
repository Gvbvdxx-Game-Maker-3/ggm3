var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var engine = require("../curengine.js");
var { makeSortable } = require("../drag-utils.js");

var selectedLibrary = -1;

function createLibrarySelection(library, index) {
  return {
    element: "div",
    className: "spriteContainer",
    style: {
      cursor: "grab",
    },
    GPWhenCreated: function (elm) {
      if (selectedLibrary == index) {
        elm.setAttribute("selected", "");
      }
    },
    children: [
      {
        element: "div",
        className: "spriteTextContainer",
        textContent: library.name,
        style: {
          marginRight: "5px",
        },
      },
      {
        element: "button",
        className: "greyButtonStyle",
        textContent: "Select",
        style: {
          fontSize: "15px",
          marginRight: "5px",
        },
        eventListeners: [
          {
            event: "click",
            func: function (elm) {},
          },
        ],
      },
    ],
  };
}

var libraryContainer = elements.getGPId("libraryContainer");

function reloadLibrariesSelection() {
  elements.removeAllChildren(libraryContainer);
  if (engine.libraries.length < 1) {
    elements.appendElementsFromJSON(libraryContainer, [
      {
        element: "span",
        textContent: "No libraries. Press the + button to create one.",
        style: {
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          padding: "4px 4px",
        },
      },
    ]);
  } else {
    elements.appendElementsFromJSON(
      libraryContainer,
      engine.libraries.map(createLibrarySelection),
    );
  }
}
/*
makeSortable(
    libraryContainer,
    ".spriteContainer",
    (oldIndex, newIndex) => {
      if (oldIndex === newIndex) return;
      var spriteToMove = deps.engine.sprites[oldIndex];
      deps.engine.sprites.splice(oldIndex, 1);
      deps.engine.sprites.splice(newIndex, 0, spriteToMove);
      if (selectedLibrary) {
        state.currentSelectedSpriteIndex = deps.engine.sprites.indexOf(
          state.currentSelectedSprite,
        );
      }

    },
  );*/

var addLibraryButton = elements.getGPId("addLibraryButton");
var libraryAddMenu = elements.getGPId("libraryAddMenu");

function closeAddMenu() {
  libraryAddMenu.hidden = true;
  libraryAddMenu.innerHTML = "";
}

function showAddMenu() {
  libraryAddMenu.hidden = false;
  var elms = [
    {
      element: "div",
      className: "spriteAddMenuItem",
      eventListeners: [
        {
          event: "click",
          func: function () {
            closeAddMenu();
            var library = engine.createEmptyLibrary();
            reloadLibrariesSelection();
          },
        },
      ],
      children: [
        {
          element: "img",
          src: "/icons/add.svg",
        },
        "New",
      ],
    },
  ];
  elements.setInnerJSON(libraryAddMenu, elms);
}

addLibraryButton.addEventListener("click", (event) => {
  showAddMenu();
  event.stopPropagation();
});

document.addEventListener("click", function (evt) {
  closeAddMenu();
});

reloadLibrariesSelection();
