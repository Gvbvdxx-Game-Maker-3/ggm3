(function () {
  ///////////////////////////////////////////////////////////

  //Check that we have everything before running
  if (!window.Game || !window.GGM3Engine) {
    window.alert(
      "Couldn't find either GGM3Engine or the Game object," +
        "you may have to include the scripts.",
    );
    return;
  }

  ///////////////////////////////////////////////////////////

  const QuickStart = false;

  ///////////////////////////////////////////////////////////

  //Error handling in case the game is bad quality or something broken

  window.addEventListener(
    "error",
    (event) => {
      window.alert(event.message);
    },
    false,
  );

  window.addEventListener("unhandledrejection", (event) => {
    window.alert(event.reason);
  });

  ///////////////////////////////////////////////////////////

  //Find elements

  var Game = window.Game;
  var GGM3Engine = window.GGM3Engine;

  var loadingScreen = document.getElementById("loadingscreen");
  var loadingBarInner = document.getElementById("loadingbar-inner");
  var loadingBarInnerText = document.getElementById("loadingbar-innertext");
  var gameContent = document.getElementById("gameContent");
  var gameCanvas = document.getElementById("gameCanvas");
  var clickToStart = document.getElementById("clicktostart");
  var clickToStartButton = document.getElementById("clicktostart-button");

  ///////////////////////////////////////////////////////////

  //Make sure the elements are proper.
  loadingScreen.hidden = false;
  gameContent.hidden = true;
  clickToStart.hidden = true;

  ///////////////////////////////////////////////////////////

  var engine = new GGM3Engine(gameCanvas);
  Game.attachEngine(engine);

  ///////////////////////////////////////////////////////////

  function setProgress(current, max) {
    var percent = (current / max) * 100;

    loadingBarInner.style.width = Math.round(percent).toFixed(5) + "%";
    loadingBarInnerText.textContent = `Loading... ${percent.toFixed(2)}%`;
  }

  setProgress(0, 100);
  Game.addEventListener("progress", setProgress);

  ///////////////////////////////////////////////////////////

  Game.addEventListener("error", (err) => {
    loadingBarInnerText.setAttribute("error", "");
    loadingBarInnerText.textContent =
      "Error! Check browser developer tools for more info.";
  });

  ///////////////////////////////////////////////////////////

  Game.addEventListener("loaded", () => {
    if (QuickStart) {
      startGame();
    } else {
      loadingScreen.hidden = true;
      gameContent.hidden = true;

      clickToStart.hidden = false;
      var launched = false;
      clickToStartButton.addEventListener("click", () => {
        if (launched) return;
        startGame();
        launched = true;
      });
    }
  });

  ///////////////////////////////////////////////////////////

  //Resize handling so that when the window resizes the game fits the entire screen.
  function handleResize() {
    var scale = window.innerHeight / engine.gameHeight;
    var scaleHorizontal = window.innerWidth / engine.gameWidth;
    if (scale > scaleHorizontal) {
      scale = scaleHorizontal;
    }
    gameCanvas.style.width = scale * engine.gameWidth + "px";
    gameCanvas.style.height = scale * engine.gameHeight + "px";
    engine.screenScale = scale;
    engine.updateCanvasSize();
  }

  window.addEventListener("resize", handleResize);

  ///////////////////////////////////////////////////////////

  //Function to retrieve mouse position based on element size and the target size.
  function getMousePosition(event, onElement, size) {
    var client = onElement.getBoundingClientRect();

    var relativeX = event.x - client.x;
    var relativeY = event.y - client.y;

    var scaleX = client.width / size[0];
    var realX = relativeX * scaleX;

    var scaleY = client.height / size[1];
    var realY = relativeY * scaleY;

    if (realX < 0) {
      realX = 0;
    }
    if (realY < 0) {
      realY = 0;
    }

    if (realX > size[0]) {
      realX = size[0];
    }
    if (realY > size[1]) {
      realY = size[1];
    }

    var pos = {
      x: realX,
      y: realY,
    };
    return pos;
  }

  ///////////////////////////////////////////////////////////

  //Feed the user input into the engine.

  function startInputHandling() {
    document.addEventListener("mousemove", (event) => {
      var pos = getMousePosition(event, gameCanvas, [
        gameCanvas.width,
        gameCanvas.height,
      ]);
      engine.changeMousePosition(pos.x, pos.y);
    });

    gameCanvas.addEventListener("mousedown", (event) => {
      engine.changeMouseDown(true);
    });

    document.addEventListener("mouseup", (event) => {
      engine.changeMouseDown(false);
    });

    document.addEventListener("keydown", (event) => {
      if (document.activeElement == document.body) {
        engine.changeKeyPressed(event.key, true);
        event.preventDefault();
      }
    });

    document.addEventListener("keyup", (event) => {
      engine.changeKeyPressed(event.key, false);
    });
  }

  ///////////////////////////////////////////////////////////

  //Start game loop handler

  function startGame() {
    handleResize();
    startInputHandling();
    engine.startGame();

    loadingScreen.hidden = true;
    clickToStart.hidden = true;

    engine.once(engine.FRAME_RENDERED, () => {
      //This waits for the next frame so that
      // it doesn't show the stopped frame of the game briefly.
      gameContent.hidden = false;
    });
  }

  ///////////////////////////////////////////////////////////

  //Finally start preloading the game.
  Game.loadGame();
})();
