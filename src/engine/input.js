
class GGM3Input {
    constructor (engine) {
        this.engine = engine;
        this.keysPressed = {};
    }

    setKeyPressed(key, down) {
        var keyName = key.toLowerCase();
        if (this.keyNames[key]) {
            keyName = this.keyNames[key];
        }
        if (down) {
            this.keysPressed[keyName] = true;
        } else {
            delete this.keysPressed[keyName];
        }
    }
}