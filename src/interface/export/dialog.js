var elements = require("../../gp2/elements.js");
var { getExportOptions } = require("./options");
var ExportEvents = require("./events.js");

////////////////////////////////////////////////////////////////////////////

var currentCompilerActive = null;

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
                  if (currentCompilerActive) {
                    try {
                      currentCompilerActive.cancel();
                    } catch (e) {
                      console.warn(`Unable to cancel the game exporter: `, e);
                    }
                    currentCompilerActive = null;
                  }
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
                textContent: "Types:",
              },
              {
                element: "div",
                className: "exportGameTypeSelection",
                gid: "exportGameTypeSelection",
              },
            ],
          },
          ///////////////////////////////
          {
            element: "div",
            className: "exportOptionsContainer",
            gid: "exportOptionsContainer",
          },
          ///////////////////////////////
          {
            element: "div",
            className: "exportButtonsContainer",
            gid: "exportButtonsContainer",
          },
        ],
      },
      ///////////////////////////////
    ],
  },
])[0];

document.body.append(exportDialog);

////////////////////////////////////////////////////////////////////////////

var exportGameTypeSelection = elements.getGPId("exportGameTypeSelection");
var exportOptionsContainer = elements.getGPId("exportOptionsContainer");
var exportButtonsContainer = elements.getGPId("exportButtonsContainer");
var selectedType = 0;
var exportOptions = {};

function getExportOptionValues() {
  return exportOptions;
}

function renderExportButtons(additionalButtons = []) {
  var modes = getExportOptions();
  var mode = modes[selectedType];
  if (!mode) {
    return;
  }
  var buttons = [
    {
      name: "Export",
      icon: "icons/package.svg",
      _span_gid: "exportDialogExportButtonSpan",
      action: () => {
        if (currentCompilerActive) {
          try {
            currentCompilerActive.cancel();
          } catch (e) {
            console.warn(`Unable to cancel the game exporter: `, e);
          }
          currentCompilerActive = null;
        }
        var buttonSpan = elements.getGPId("exportDialogExportButtonSpan");
        buttonSpan.textContent = "Exporting...";
        var exporting = new mode(getExportOptionValues());
        currentCompilerActive = exporting;
        exporting.on(ExportEvents.COMPLETE, function (buttons) {
          renderExportButtons(buttons || []);
          var buttonSpan = elements.getGPId("exportDialogExportButtonSpan");
          buttonSpan.textContent = "Export complete!";
        });
        exporting.on(ExportEvents.CANCEL_COMPLETE, function (buttons) {
          renderExportButtons(buttons || []);
          var buttonSpan = elements.getGPId("exportDialogExportButtonSpan");
          buttonSpan.textContent = "Export canceled.";
        });
      },
    },
  ];

  buttons = buttons.concat(additionalButtons || []);

  elements.setInnerJSON(
    exportButtonsContainer,
    buttons.map((b, i) => {
      return {
        element: "div",
        className: "exportButton",
        ...(b._gid ? { gid: b._gid } : {}),
        eventListeners: [
          {
            event: "click",
            func: b.action || (() => {}),
          },
        ],
        children: [
          {
            element: "img",
            src: b.icon || "favicon.png",
          },
          {
            element: "span",
            textContent: b.name || "Button",
            ...(b._span_gid ? { gid: b._span_gid } : {}),
          },
        ],
      };
    }),
  );
}

function generateActualExportOption(option, index) {
  var content = [];

  if (option.type == "checkbox") {
    exportOptions[option.id] = !!option.default;
    content = [
      {
        element: "div",
        style: {
          display: "flex",
        },
        children: [
          {
            element: "span",
            textContent: "Enabled:",
          },
          {
            element: "input",
            checked: !!option.default,
            type: "checkbox",
            GPWhenCreated: function (elm) {
              elm.oninput = () => {
                exportOptions[option.id] = elm.checked;
              };
            },
          },
        ],
      },
    ];
  }

  if (option.type == "text") {
    exportOptions[option.id] = option.default || "";
    content = [
      {
        element: "div",
        style: {
          display: "flex",
        },
        children: [
          {
            element: "input",
            className: "textInput",
            value: option.default || "",
            type: "text",
            GPWhenCreated: function (elm) {
              elm.oninput = () => {
                exportOptions[option.id] = elm.value;
              };
            },
          },
        ],
      },
    ];
  }

  return {
    element: "div",
    className: "exportOptionsOptionContainer",
    children: [
      {
        element: "span",
        textContent: option.name,
        className: "exportOptionsOptionTitle",
      },
      {
        element: "br",
      },
      ...content,
      {
        element: "br",
      },
      {
        element: "span",
        textContent: option.description,
        className: "exportOptionsOptionDescription",
      },
    ],
  };
}

function renderActualExportOptions() {
  exportOptions = {};
  elements.setInnerJSON(exportOptionsContainer, []);
  var modes = getExportOptions();
  var mode = modes[selectedType];
  if (!mode) {
    return;
  }
  var info = mode.getInformation();
  var exportOpts = [
    {
      element: "div",
      className: "exportOptionsDescription",
      textContent: info.description,
    },
  ];
  exportOpts = exportOpts.concat(
    info.options.map((o, i) => generateActualExportOption(o, i)),
  );
  elements.setInnerJSON(exportOptionsContainer, exportOpts);
}

function generateExportOption(option, index) {
  var information = option.getInformation();
  var e = {
    element: "div",
    className: "exportGameType",
    title: information.description,
    GPWhenCreated: function (elm) {
      if (index == selectedType) {
        elm.setAttribute("selected", "");
      }
    },
    eventListeners: [
      {
        event: "click",
        func: function () {
          selectedType = index;
          renderExportOptions();
          renderActualExportOptions();
        },
      },
    ],
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
  var jsonArray = exportOptions.map((o, i) => generateExportOption(o, i));
  elements.setInnerJSON(exportGameTypeSelection, jsonArray);
}

////////////////////////////////////////////////////////////////////////////

function showExportDialog() {
  exportDialog.hidden = false;
  renderExportOptions();
  renderActualExportOptions();
  renderExportButtons();
}

////////////////////////////////////////////////////////////////////////////

module.exports = {
  showExportDialog,
};
