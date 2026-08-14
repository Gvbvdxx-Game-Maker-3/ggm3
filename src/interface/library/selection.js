
var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");

var selectedLibrary = -1;

function createLibrarySelection(library,index) {
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
                    
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Delete",
              style: {
                fontSize: "15px",
                marginRight: "5px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function (elm) {
                    
                  },
                },
              ],
            },
            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Duplicate",
              style: {
                fontSize: "15px",
                marginRight: "5px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: function (elm) {
                    
                  },
                },
              ],
            },

            {
              element: "button",
              className: "greyButtonStyle",
              textContent: "Export",
              style: {
                fontSize: "15px",
                marginRight: "5px",
              },
              eventListeners: [
                {
                  event: "click",
                  func: async function (elm) {

                  },
                },
              ],
            },
          ],
        }
}

function reloadLibrariesSelection() {
}

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