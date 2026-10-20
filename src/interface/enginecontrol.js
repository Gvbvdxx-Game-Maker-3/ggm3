var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");
var engine = require("./curengine.js");
var canvas = elements.getGPId("projectCanvas");
var tabs = require("./tabs.js");

var isFullscreen = false;
var fullscreenModeContainer = elements.getGPId("fullscreenModeContainer");
var projectControls = elements.getGPId("projectControls");
var projectContainer = elements.getGPId("projectContainer");
var fullscreenModeContainerMain = elements.getGPId(
  "fullscreenModeContainerMain",
);

var gameViewportStyles = document.createElement("style");
document.body.append(gameViewportStyles);

function updateGameViewportStyles() {
  gameViewportStyles.textContent = `:root { --game-viewport-width: ${engine.gameWidth}px; --game-viewport-height: ${engine.gameHeight}px; }`;
  tabs.updateTabs();
}

function switchFullscreenMode() {
  canvas.remove();
  projectControls.remove();
  fullscreenModeContainerMain.hidden = !isFullscreen;
  if (isFullscreen) {
    fullscreenModeContainer.append(projectControls);
    fullscreenModeContainer.append(canvas);
    function handleResize() {
      var controlsRect = projectControls.getBoundingClientRect();
      var scale =
        (window.innerHeight - controlsRect.height) / engine.gameHeight;
      var scaleHorizontal = window.innerWidth / engine.gameWidth;
      if (scale > scaleHorizontal) {
        scale = scaleHorizontal;
      }
      canvas.style.width = scale * engine.gameWidth + "px";
      canvas.style.height = scale * engine.gameHeight + "px";
      engine.screenScale = scale;
    }
    window.onresize = handleResize;
    handleResize();
    tabs.hideEverything();
  } else {
    projectContainer.append(projectControls);
    projectContainer.append(canvas);
    window.onresize = function () {};
    canvas.style.width = "unset";
    canvas.style.height = "unset";
    engine.screenScale = 1;
    tabs.updateTabs();
  }
}

switchFullscreenMode();
elements.setInnerJSON(projectControls, [
  {
    element: "div",
    className: "projectButton",
    title: "Start/play game",
    children: [
      {
        element: "img",
        src: "icons/playcircle.svg",
        className: "projectButtonImg",
      },
    ],
    eventListeners: [
      {
        event: "click",
        func: function () {
          engine.startGame();
        },
      },
    ],
  },
  {
    element: "div",
    className: "projectButton",
    title: "Stop/end game",
    children: [
      {
        element: "img",
        src: "icons/stopcircle.svg",
        className: "projectButtonImg",
      },
    ],
    eventListeners: [
      {
        event: "click",
        func: function () {
          engine.stopGame();
        },
      },
    ],
  },
  {
    element: "div",
    style: {
      marginRight: "auto",
    },
  },
  {
    element: "div",
    className: "projectButton",
    GPWhenCreated: (elm) => {
      if (engine.editMode) {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/grab.svg",
            className: "projectButtonImg",
          },
        ]);
      } else {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/nograb.svg",
            className: "projectButtonImg",
          },
        ]);
      }
    },
    title: "Toggle dragging sprites",
    eventListeners: [
      {
        event: "click",
        func: function () {
          if (engine.editMode) {
            engine.turnOffEditing();
          } else {
            engine.turnOnEditing();
          }
          if (engine.editMode) {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/grab.svg",
                className: "projectButtonImg",
              },
            ]);
          } else {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/nograb.svg",
                className: "projectButtonImg",
              },
            ]);
          }
        },
      },
    ],
  },
  {
    element: "div",
    className: "projectButton",
    GPWhenCreated: (elm) => {
      if (isFullscreen) {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/fullscreen-exit.svg",
            className: "projectButtonImg",
          },
        ]);
      } else {
        elements.setInnerJSON(elm, [
          {
            element: "img",
            src: "icons/fullscreen.svg",
            className: "projectButtonImg",
          },
        ]);
      }
    },
    title: "Toggle fullscreen",
    eventListeners: [
      {
        event: "click",
        func: function () {
          isFullscreen = !isFullscreen;
          switchFullscreenMode();
          if (isFullscreen) {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/fullscreen-exit.svg",
                className: "projectButtonImg",
              },
            ]);
          } else {
            elements.setInnerJSON(this, [
              {
                element: "img",
                src: "icons/fullscreen.svg",
                className: "projectButtonImg",
              },
            ]);
          }
        },
      },
    ],
  },
]);

var mousePos = elements.getGPId("projectMouseCoordinates");

function updateCoordinates() {
  var text = `X: ${Math.round(engine.input.mouseX)} Y: ${Math.round(engine.input.mouseY)} Down: ${engine.input.mouseDown}`;
  if (mousePos.textContent !== text) {
    mousePos.textContent = text;
  }
}

document.addEventListener("mousemove", (event) => {
  engine.sendInput("mouse", {
    event
  });
});

canvas.addEventListener("mousedown", (event) => {
  engine.sendInput("mouse", {
    down: true
  });
  event.preventDefault();
});

document.addEventListener("mouseup", (event) => {
  engine.sendInput("mouse", {
    down: false
  });
});

document.addEventListener("keydown", (event) => {
  if (document.activeElement == document.body) {
    engine.sendInput("keyboard", {
      event,
      down: true
    });
    event.preventDefault();
  }
});

document.addEventListener("keyup", (event) => {
  engine.sendInput("keyboard", {
    event,
    down: false
  });
});

updateGameViewportStyles();

engine.on(engine.RESOLUTION_UPDATED, () => {
  updateGameViewportStyles();
});

engine.on(engine.FRAME_RENDERED, () => {
  updateCoordinates();
});
