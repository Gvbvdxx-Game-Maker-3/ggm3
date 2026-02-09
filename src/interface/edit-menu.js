var elements = require("../gp2/elements.js");
var gameSettingOptions = require("./gamesettingoptions.js");

var gameSettingsDialog = elements.createElementsFromJSON([
  {
    element: "div",
    hidden: true,
    children: [
      {
        element: "div",
        className: "dialogBackground",
      },

      {
        element: "div",
        className: "gameSettingsBox centerMiddle",
        children: [
          {
            element: "h2",
            textContent: "Game Settings",
            style: {
              textAlign: "center",
              flexShrink: "0px",
            },
          },
          {
            element: "div",
            className: "gameSettingSelection",
            children: [
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
                  gameSettingsDialog.hidden = true;
                },
              },
            ],
          },
          {
            element: "div",
            className: "gameSelectionCategory",
            children: gameSettingOptions.elements,
          },
        ],
      },
    ],
  },
])[0];

function gameSettingsShow() {
  gameSettingsDialog.hidden = false;
}

gameSettingsDialog.hidden = true;
document.body.append(gameSettingsDialog);

var { addAppMenu } = require("./dropdown-menus.js");

addAppMenu(
  "edit",
  [
    {
      element: "img",
      src: "icons/edit.svg",
    },
    {
      element: "span",
      textContent: "Edit",
    },
  ],
  [
    {
      label: "Edit game settings",
      icon: "icons/controller.svg",
      action: async function () {
        gameSettingsShow();
      },
    },
  ],
);

gameSettingOptions.start();
