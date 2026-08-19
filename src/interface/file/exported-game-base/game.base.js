(function () {
  //////////////////////////////////////////////////////////////////

  var Game = (window.Game = {});
  var GameEvents = {};
  
  Game.content = "|%GGM3Game%|"; //String makes the beautifier not break the code. This is replaced with the actual game code when generating the game.

  //Hack to force-include Game.content.
  window.__content__ = Game.content;
  window.__content__ = null;
  delete window.__content__;

  //////////////////////////////////////////////////////////////////

  GameEvents.progress = [];
  GameEvents.loaded = [];
  GameEvents.error = [];

  Game.events = GameEvents;

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

  var engine = null;
  var progressMonitor = {};

  function getEngine() {
    return Game.engine;
  }
  
  function attachEngine(eng) {
    if (engine) {
      throw new Error("GGM3Engine was already attached.");
      return;
    }
    if (!eng) {
      throw new Error("No GGM3Engine provided.");
      return;
    }
    if (typeof eng !== "object") {
      throw new Error("Engine provided isn't a GGM3Engine.");
      return;
    }
    engine = eng;
  }

  Game.getEngine = getEngine;
  Game.attachEngine = attachEngine;

  //////////////////////////////////////////////////////////////////

  //Most of these used from from-to.js

  function _fromEnginePropertyNames(from) {
    engine.propertyVariables = {};
    for (var name of from || []) {
      engine.propertyVariables[name] = true;
    }
  }

  function fromEngineJSON(mainJSON) {
    Object.assign(engine, {
      globalVariables: mainJSON.globalVariables || {},
      broadcastNames: mainJSON.broadcastNames || [],
      frameRate: mainJSON.frameRate || 60,
      gameWidth: mainJSON.gameWidth || engine.DEFAULT_WIDTH,
      gameHeight: mainJSON.gameHeight || engine.DEFAULT_HEIGHT,
    });
    _fromEnginePropertyNames(mainJSON.spriteProperties);
    engine.updateCanvasSize();
  }

  function fromLibraryJSON(library, libraryJson) {
    Object.assign(library, {
      name: "" + libraryJson.name,
      id: libraryJson.id,
    });
  }

  function fromLibraryCostumeJSON(libCostume, libCostumeJson) {
    Object.assign(libCostume, {
      name: "" + libCostumeJson.name,
      id: libCostumeJson.id,
      mimeType: libCostumeJson.mimeType,
    });
  }

  function fromLibrarySoundJSON(libSound, libSoundJson) {
    Object.assign(libSound, {
      name: "" + libSoundJson.name,
      id: libSoundJson.id,
    });
  }

  function fromSpriteJSON(sprite, spriteJson) {
    Object.assign(sprite, {
      x: spriteJson.x,
      y: spriteJson.y,
      angle: spriteJson.angle,
      scaleX: spriteJson.scaleX,
      scaleY: spriteJson.scaleY,
      skewX: spriteJson.skewX || 0,
      skewY: spriteJson.skewY || 0,
      size: spriteJson.size,
      blocklyXML: spriteJson.blocklyXML
        ? Blockly.Xml.textToDom(spriteJson.blocklyXML)
        : null,
      name: spriteJson.name,
      costumeIndex: spriteJson.costumeIndex,
      zIndex: spriteJson.zIndex,
      variables: spriteJson.variables,
      hidden: spriteJson.hidden,
      spriteProperties: spriteJson.properties || {},
    });
  }

  function fromCostumeJSON(costume, costumeJson) {
    Object.assign(costume, {
      id: costumeJson.id,
      rotationCenterX: costumeJson.rotationCenterX,
      rotationCenterY: costumeJson.rotationCenterY,
      preferedScale: costumeJson.preferedScale,
      willPreload: costumeJson.willPreload,
      mimeType: costumeJson.mimeType,
      linkID: costumeJson.linkID,
    });
  }

  function fromSoundJSON(sound, soundJson) {
    Object.assign(sound, {
      id: soundJson.id,
      willPreload: soundJson.willPreload,
      mimeType: soundJson.mimeType,
      linkID: soundJson.linkID,
    });
  }

  //////////////////////////////////////////////////////////////////

  function determineLoadSize(content) {
    var max = 0;

    for (var library of content.libraries) {
      max += library.costumes.length;
      max += library.sounds.length;
    }

    for (var spriteData of content.sprites) {
      max += spriteData.sprite.costumes.length;
      max += spriteData.sprite.sounds.length;
    }

    progressMonitor.max = max;
    progressMonitor.current = 0;
    sendProgress();
  }

  function sendProgress() {
    _callEvent("progress", progressMonitor.current, progressMonitor.max);
  }

  async function loadLibraries(libraries) {
    for (var libraryJson of libraries) {
      var library = engine.createEmptyLibrary();
      fromLibraryJSON(library, libraryJson);

      for (var costumeJson of libraryJson.costumes) {
        var libCostume = library.addCostume(
          costumeJson.url,
          costumeJson.name,
          costumeJson.mimeType,
          costumeJson.id
        );

        fromLibraryCostumeJSON(libCostume, costumeJson);
        
        progressMonitor.current += 1;
        sendProgress();
      }

      for (var soundJson of libraryJson.sounds) {
        var libSound = library.addSound(
          soundJson.url,
          soundJson.name,
          soundJson.mimeType,
          soundJson.id
        );

        fromLibrarySoundJSON(libSound, soundJson);

        progressMonitor.current += 1;
        sendProgress();
      }
    }
  }

  async function loadSprites(sprites) {
    var functions = [];
    for (var spriteData of sprites) {
      await (async function (spriteData) {
        var spriteJson = spriteData.sprite;
        var sprite = engine.createEmptySprite();
        fromSpriteJSON(sprite, spriteJson);

        var funcIds = [];

        for (var blockid of Object.keys(spriteData.functions)) {
          sprite.spriteFunctions[blockid] = spriteData.functions[blockid];
          funcIds.push(blockid);
        }

        function addFunc() {
          for (var blockid of funcIds) {
            sprite.runFunctionID(blockid);
          }
        }
        functions.push(addFunc); //We'll fire them off at the end where all the sprites are actually ready.

        for (var costumeJson of spriteJson.costumes) {
          var source = costumeJson.url;
          if (costumeJson.isLinked) {
            source = engine.findLibraryCostume(costumeJson.linkID);
          }

          var costume = null;
          if (costumeJson.willPreload) {
            costume = await sprite.addCostume(source, costumeJson.name);
          } else {
            costume = sprite.addCostumeWithoutLoading(source, costumeJson.name);
          }

          fromCostumeJSON(costume, costumeJson);
          
          progressMonitor.current += 1;
          sendProgress();
        }

        for (var soundJson of spriteJson.sounds) {
          var source = soundJson.url;
          if (soundJson.isLinked) {
            source = engine.findLibrarySound(soundJson.linkID);
          }

          var sound = null;
          if (soundJson.willPreload) {
            sound = await sprite.addSound(source, soundJson.name);
          } else {
            sound = sprite.addSoundWithoutLoading(source, soundJson.name);
          }

          fromSoundJSON(sound, soundJson);
          
          progressMonitor.current += 1;
          sendProgress();
        }
      })(spriteData);
    }

    //Run the functions to add them to the sprite.
    functions.forEach((f) => f()); 
  }

  async function _startPreloading() {
    if (!engine) {
      throw new Error("There is no attached GGM3Engine to load the game into.");
      return;
    }

    try{
      var content = Game.content;
      engine.emptyProject();
      fromEngineJSON(content.engineProps);
      determineLoadSize(content);
      await loadLibraries(content.libraries);
      await loadSprites(content.sprites);
    }catch(e){
      _callEvent("error", e);
      throw e;
      return;
    }
    _callEvent("loaded");
  }

  Game.startPreloading = _startPreloading;

  //////////////////////////////////////////////////////////////////
})();
