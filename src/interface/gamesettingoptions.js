var gameSettingOptions = {};
var elements = require("../gp2/elements.js");
var engine = require("./curengine.js");

function numberInputEventListeners() {
  return {
    eventListeners: [
      {
        event: "change",
        func: function () {
          this.value = +this.value;
          if (+this.value > +this.max) {
            this.value = +this.max;
          }
          if (+this.value < +this.min) {
            this.value = +this.min;
          }
        },
      },
    ],
  };
}

gameSettingOptions.elements = [
  {
    element: "div",
    className: "infoDiv",
    children: [
      //Game resolution
      {
        element: "b",
        textContent: "Game resolution: ",
      },

      {
        element: "br",
      },
      {
        element: "span",
        textContent: "Width: ",
      },
      {
        element: "input",
        ...numberInputEventListeners(),
        type: "number",
        min: 1,
        max: 99999,
        value: 5,
        gid: "game-settings-gameWidth",
      },

      {
        element: "br",
      },
      {
        element: "span",
        textContent: "Height: ",
      },
      {
        element: "input",
        ...numberInputEventListeners(),
        type: "number",
        min: 1,
        max: 99999,
        value: 5,
        gid: "game-settings-gameHeight",
      },
    ],
  },
];

gameSettingOptions.start = function () {
  var widthInput = elements.getGPId("game-settings-gameWidth");
  var heightInput = elements.getGPId("game-settings-gameHeight");

  widthInput.addEventListener("change", () => {
    engine.gameWidth = +widthInput.value || 1;
    engine.updateCanvasSize();
  });

  heightInput.addEventListener("change", () => {
    engine.gameHeight = +heightInput.value || 1;
    engine.updateCanvasSize();
  });

  function updateGameSize() {
    widthInput.value = engine.gameWidth;
    heightInput.value = engine.gameHeight;
  }

  engine.on(engine.RESOLUTION_UPDATED, updateGameSize);
  updateGameSize();
};

module.exports = gameSettingOptions;
