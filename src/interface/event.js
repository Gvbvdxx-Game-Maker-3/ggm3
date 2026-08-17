
var EventEmitter = require("eventemitter3");

class GUIEventTypes extends EventEmitter {
    LIBRARY_COSTUME_UPDATED = "LIBRARY_COSTUME_UPDATED";
}

module.exports = new GUIEventTypes();
