var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var engine = require("../curengine.js");
var { makeSortable } = require("../drag-utils.js");
var libraryNameInput = elements.getGPId("libraryNameInput");
var selectedSprite = require("../selectedsprite.js");

var selectedLibrary = -1;

function setCurrentLibrary(index) {
  if (!engine.libraries[index]) {
    reloadLibrariesSelection(); //Still reload it.
    return;
  }
  selectedLibrary = index;
  reloadLibrariesSelection();
  var library = engine.libraries[selectedLibrary];
  libraryNameInput.value = library.name;
}

function createLibraryHeader() {
  return {
    element: "div",
    className: "libraryHeader",
    children: [
      {
        element: "h2",
        textContent: "Libraries",
      },
    ],
  };
}

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
            func: function (elm) {
              if (selectedLibrary !== index) {
                setCurrentLibrary(index);
              }
            },
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

makeSortable(libraryContainer, ".spriteContainer", (oldIndex, newIndex) => {
  if (oldIndex === newIndex) return;

  var libraryToMove = engine.libraries[oldIndex];
  engine.libraries.splice(oldIndex, 1);
  engine.libraries.splice(newIndex, 0, libraryToMove);
  if (oldIndex == selectedLibrary) {
    selectedLibrary = newIndex;
    reloadLibrariesSelection();
  }
});

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
            selectedLibrary = engine.libraries.length - 1;
            reloadLibrariesSelection();
            selectedSprite.markProjectDirty();
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

function debounce(func, delay = 60) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

libraryNameInput.addEventListener("change", function () {
  var library = engine.libraries[selectedLibrary];
  if (!library) {
    return;
  }
  library.name = libraryNameInput.value;
  engine.checkLibraryDuplicateNames();
  libraryNameInput.value = library.name;
  reloadLibrariesSelection();
  selectedSprite.markProjectDirty();
});

reloadLibrariesSelection();

function projectLoadHandler() {
  if (engine.libraries.length == 0) {
    engine.createEmptyLibrary(); //So things don't break when there is no libraries.
  }
  setCurrentLibrary(0);
}

module.exports = {
  reloadLibrariesSelection,
  setCurrentLibrary,
  projectLoadHandler
};
