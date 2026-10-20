var MouseState = require("./mousestate.js");
var KeyboardState = require("./keyboardstate.js");

class GGM3Input {
    constructor (engine) {
        this.engine = engine;
        this.mouse = new MouseState(this);
        this.keyboard = new KeyboardState(this);
    }

    update() {
        this.mouse.update();
        this.keyboard.update();
    }
}

module.exports = GGM3Input;