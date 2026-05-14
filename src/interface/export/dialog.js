var elements = require("../../gp2/elements.js");
var { getExportOptions } = require("./options");

////////////////////////////////////////////////////////////////////////////

var exportDialog = elements.createElementsFromJSON([
  {
    element: "div",
    hidden: true,
    children: [
      ///////////////////////////////
      {
        element: "div",
        className: "dialogBackground",
      },
      ///////////////////////////////
      {
        element: "div",
        className: "gameExportBox centerMiddle",
        children: [
          ///////////////////////////////
          {
            element: "span",
            textContent: "Export Game",
            style: {
              textAlign: "center",
              flexShrink: "0px",
              fontWeight: "bold",
              fontSize: "30px",
            },
          },
          ///////////////////////////////
          {
            element: "div",
            style: {
              textAlign: "center",
              flexShrink: "0px",
            },
            children: [
              ///////////////////////////////
              {
                element: "span",
                textContent:
                  "Export your games to other devices, so you and others can play them without having to open the Gvbvdxx Game Maker 3 editor.",
              },
              ///////////////////////////////
            ],
          },
          ///////////////////////////////
          {
            element: "div",
            className: "gameSettingSelection",
            children: [
              ///////////////////////////////
              {
                element: "button",
                className: "greyButtonStyle",
                textContent: "Close",
                style: {
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                },
                onclick: () => {
                  exportDialog.hidden = true;
                },
              },
              ///////////////////////////////
            ],
          },
          ///////////////////////////////
          {
            element: "div",
            className: "exportGameTypeSelectionContainer",
            children: [
              {
                element: "span",
                textContent: "Types:"
              },
              {
                element: "div",
                className: "exportGameTypeSelection",
                gid: "exportGameTypeSelection"
              }
            ],
          },
          ///////////////////////////////
        ],
      },
      ///////////////////////////////
    ],
  },
])[0];

document.body.append(exportDialog);

////////////////////////////////////////////////////////////////////////////

var exportGameTypeSelection = elements.getGPId("exportGameTypeSelection");
var selectedType = 0;

function generateExportOption(option, index) {
  var information = option.getInformation();
  var e = {
    element: "div",
    className: "exportGameType",
    GPWhenCreated: function (elm) {
      if (index == selectedType) {
        elm.setAttribute("selected","");
      }
    },
    children: [
      {
        element: "img",
        src: information.icon,
      },
      {
        element: "span",
        textContent: information.name,
      },
    ],
  };

  return e;
}

function renderExportOptions() {
  var exportOptions = getExportOptions();
  var jsonArray = exportOptions.map((o,i) => generateExportOption(o,i));
  elements.setInnerJSON(exportGameTypeSelection, jsonArray);
}

////////////////////////////////////////////////////////////////////////////

function showExportDialog() {
  exportDialog.hidden = false;
  renderExportOptions();
}

////////////////////////////////////////////////////////////////////////////

module.exports = {
  showExportDialog,
};
