(function () {
	//////////////////////////////////////////////////////////////////
	
	const GameContent = |%GGM3Game%|;
	var Game = {}; //This is meant to be global.
	window["Game"] = Game;
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
				var func2 = function (...args) {
					var r = func(...args);
					_game_removeEventListener(eventName, func2);
					return r;
				};
				eventArray.push(func2);
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
	
	
})();