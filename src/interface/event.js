
var EventEmitter = require("eventemitter3");

class GUIEventTypes extends EventEmitter {
    REFRESH_SPRITE_COSTUMES = "REFRESH_SPRITE_COSTUMES";
}

module.exports = new GUIEventTypes();
