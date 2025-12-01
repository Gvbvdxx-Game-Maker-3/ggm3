var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");
var dialogs = require("./dialogs.js");

var engine = require("./curengine.js");
var workspaceConfig = {
  comments: true,
  disable: false,
  collapse: false,
  media: "../media/",
  readOnly: false,
  rtl: false,
  scrollbars: true,
  //toolboxPosition: "side",
  //horizontalLayout: "start",
  trashcan: false,
  sounds: false,
  zoom: {
    controls: false,
    wheel: false,
    startScale: 1,
    maxScale: 4,
    minScale: 0.25,
    scaleSpeed: 1.1,
  },
  colours: {
    workspace: "#7d7d7d",
    flyout: "#787878",
    toolbox: "#7d7d7d",
    toolboxSelected: "#3d3d3d",
    scrollbar: "#CECDCE",
    scrollbarHover: "#CECDCE",
    insertionMarker: "#000000",
    insertionMarkerOpacity: 0.2,
    fieldShadow: "rgba(255, 255, 255, 0.3)",
    dragShadowOpacity: 0.6,
    text: "#ffffff",
  },
};

function showCustomBlockDialog(mutator, callback, mainWorkspace) {
  var workspaceArea = null;
  var customBlockButtons = null;
  var customBlockButtons2 = null;
  var customBlockButtons3 = null;
  var dialogDiv = elements.createElementsFromJSON([
    {
      element: "div",
      children: [
        {
          element: "div",
          className: "customBlockDialogBG",
        },
        {
          element: "div",
          className: "customBlockDialogBox",
          children: [
            {
              element: "span",
              style: {
                fontWeight: "bold",
                fontSize: "30px",
              },
              textContent: "Create a block",
            },
            {
              element: "div",
              className: "customBlockWorkspace",
              GPWhenCreated: function (elm) {
                workspaceArea = elm;
              },
            },
            {
              element: "div",
              className: "customBlockButtons",
              GPWhenCreated: function (elm) {
                customBlockButtons = elm;
              },
            },
            {
              element: "div",
              className: "customBlockButtons",
              GPWhenCreated: function (elm) {
                customBlockButtons2 = elm;
              },
            },
            {
              element: "div",
              className: "customBlockButtons",
              GPWhenCreated: function (elm) {
                customBlockButtons3 = elm;
              },
            },
          ],
        },
      ],
    },
  ])[0];
  document.body.append(dialogDiv);

  var oldDefaultToolbox = Blockly.Blocks.defaultToolbox;
  Blockly.Blocks.defaultToolbox = null;
  var workspace = Blockly.inject(workspaceArea, workspaceConfig);
  Blockly.Blocks.defaultToolbox = oldDefaultToolbox;

  var mutationRoot = workspace.newBlock("procedures_declaration");
  mutationRoot.setMovable(false);
  mutationRoot.setDeletable(false);
  mutationRoot.contextMenu = false;
  var Msg = Blockly.Msg;
  workspace.addChangeListener(() => {
    workspaceArea.style.width = mutationRoot.width + 40 + "px";
    workspaceArea.style.height = mutationRoot.height + 40 + "px";

    mutationRoot.onChangeFn();
    Blockly.svgResize(workspace);
    // Keep the block centered on the workspace
    var metrics = workspace.getMetrics();
    var { x, y } = mutationRoot.getRelativeToSurfaceXY();
    var dy = metrics.viewHeight / 2 - mutationRoot.height / 2 - y;
    var dx;
    dx = metrics.viewWidth / 2 - mutationRoot.width / 2 - x;
    if (mutationRoot.width > metrics.viewWidth) {
      dx = metrics.viewWidth - mutationRoot.width - x;
    }
    mutationRoot.moveBy(dx, dy);
  });
  mutationRoot.domToMutation(mutator);
  mutationRoot.initSvg();
  mutationRoot.render();
  //setState({warp: this.mutationRoot.getWarp()});
  // Allow the initial events to run to position this block, then focus.
  setTimeout(() => {
    mutationRoot.focusLastEditor_();
    if (!workspace) {
      return;
    }
    Blockly.svgResize(workspace);
  });

  elements.setInnerJSON(customBlockButtons, [
    {
      element: "div",
      style: {
        display: "flex",
      },
      children: [
        {
          element: "span",
          textContent: "Run without screen refresh: ",
        },
        {
          element: "input",
          type: "checkbox",
          checked: mutationRoot.getWarp(),
          GPWhenCreated: function (elm) {
            elm.oninput = function () {
              mutationRoot.setWarp(elm.checked);
            };
          },
        },
      ],
    },
  ]);
  elements.setInnerJSON(customBlockButtons2, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Add label",
      eventListeners: [
        {
          event: "click",
          func: function () {
            mutationRoot.addLabelExternal();
          },
        },
      ],
    },
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Add boolean",
      eventListeners: [
        {
          event: "click",
          func: function () {
            mutationRoot.addBooleanExternal();
          },
        },
      ],
    },
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Add text/number",
      eventListeners: [
        {
          event: "click",
          func: function () {
            mutationRoot.addStringNumberExternal();
          },
        },
      ],
    },
  ]);
  elements.setInnerJSON(customBlockButtons3, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Done",
      eventListeners: [
        {
          event: "click",
          func: function () {
            callback(mutationRoot.mutationToDom(true));
            workspace.dispose();
            dialogDiv.remove();
            mainWorkspace.getToolbox().refreshSelection();
          },
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
          func: function () {
            callback();
            workspace.dispose();
            dialogDiv.remove();
            mainWorkspace.getToolbox().refreshSelection();
          },
        },
      ],
    },
  ]);
}

module.exports = {
  showCustomBlockDialog,
};
