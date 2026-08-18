(function () {
  //////////////////////////////////////////////////////////////////

  const GameContent = "|%GGM3Game%|"; //String makes the beautifier not break the code. This is replaced with the actual game code when generating the game.
  var Game = (window.Game = {});
  var GameEvents = {};

  //This makes it add it and then remove it which
  // should trick the compression logic to include it no matter what.
  window._ = GameContent;
  window._ = "";
  delete window._;

  //////////////////////////////////////////////////////////////////

  GameEvents.progress = [];
  GameEvents.loaded = [];
  GameEvents.error = [];

  function _game_removeEventListener(eventName, func) {
    if (typeof eventName !== "string") {
      throw new Error("Event name isn't a string.");
      return;
    }
    var eventArray = GameEvents[eventName];
    if (eventArray) {
      GameEvents[eventName] = eventArray.filter((f) => !(func == f));
    } else {
      throw new Error("Event doesn't exist");
      return;
    }
  }

  function _game_addEventListener(eventName, func, options = {}) {
    if (typeof eventName !== "string") {
      throw new Error("Event name isn't a string.");
      return;
    }
    var safeOptions = options || {};
    var eventArray = GameEvents[eventName];
    if (eventArray) {
      if (safeOptions.once) {
        var wrapper = function (...incomingArgs) {
          var result = func(...incomingArgs);
          _game_removeEventListener(eventName, wrapper);
          return result;
        };
        eventArray.push(wrapper);
      } else {
        eventArray.push(func);
      }
    } else {
      throw new Error("Event doesn't exist");
      return;
    }
  }

  function _callEvent(eventName, ...args) {
    var eventArray = GameEvents[eventName];
    if (!eventArray) {
      return;
    }
    eventArray.forEach((f) => f(...args));
  }

  Game.addEventListener = _game_addEventListener;
  Game.removeEventListener = _game_removeEventListener;

  //////////////////////////////////////////////////////////////////

  Game.engine = null;
  function attachEngine(engine) {
    if (!engine) {
      throw new Error("No GGM3Engine provided.");
      return;
    }
    if (!engine.__isGGM3Engine__) {
      throw new Error("Engine provided isn't a GGM3Engine.");
      return;
    }
    Game.engine = engine;
  }

  //////////////////////////////////////////////////////////////////

  //Most of these used from from-to.js

  //////////////////////////////////////////////////////////////////

  //Function used to assign the generated sprite
  function assignSpriteLogic(spr, functions) {
    //spr is the GGM3 sprite class, not an JSON object.
    for (var id of Object.keys(functions)) {
      //ID: Function
      var spriteFunction = functions[id];

      spr.addFunction();
    }
  }

  //////////////////////////////////////////////////////////////////

  function _startPreloading() {
    if (!Game.engine) {
      throw new Error("There is no attached GGM3Engine to load the game into.");
      return;
    }
  }

  Game.startPreloading = _startPreloading;

  //////////////////////////////////////////////////////////////////
})();
