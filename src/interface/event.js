var EventEmitter = require("eventemitter3");

class GUIEventTypes extends EventEmitter {
  REFRESH_SPRITE_COSTUMES = "REFRESH_SPRITE_COSTUMES";
  REFRESH_SPRITE_SOUNDS = "REFRESH_SPRITE_SOUNDS";
  MARK_PROJECT_DIRTY = "MARK_PROJECT_DIRTY";
}

module.exports = new GUIEventTypes();
