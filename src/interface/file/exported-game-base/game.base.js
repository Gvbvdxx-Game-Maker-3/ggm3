(function () {
	//////////////////////////////////////////////////////////////////
	
	const GameContent = |%GGM3Game%|;
	var Game = window.Game = {};
	var GameEvents = {};
	
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
	};
	
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
			//blocklyXML isn't used in exports since we're using pre-generated code, and also because there is no Blockly library included.
	    //blocklyXML: spriteJson.blocklyXML
	    //  ? Blockly.Xml.textToDom(spriteJson.blocklyXML)
	    //  : null,
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
	  });
	}

	function fromSoundJSON(sound, soundJson) {
	  Object.assign(sound, {
	    id: soundJson.id,
	    willPreload: soundJson.willPreload,
	    mimeType: soundJson.mimeType,
	  });
	}

	//////////////////////////////////////////////////////////////////

	//Function used to assign the generated sprite 
	function assignSpriteLogic(spr, functions) { //spr is the GGM3 sprite class, not an JSON object.
		for (var id of Object.keys(functions)) { //ID: Function
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