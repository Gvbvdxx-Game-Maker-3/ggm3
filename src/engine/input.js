var MouseState = require("./mousestate.js");
var KeyboardState = require("./keyboardstate.js");

class GGM3Input {
    constructor (engine) {
        this.engine = engine;
        this.mouse = new MouseState(this);
        this.keyboard = new KeyboardState(this);
    }

    sendInput(eventName, data) {
        if (eventName == "keyboard") {
            this.keyboard.write(data);
            return;
        }
        if (eventName == "mouse") {
            this.mouse.write(data);
            return;
        }

        throw new Error(`Invalid event name: ${eventName}. Use one of these: "keyboard", "mouse"`);
    }

    getMouseMask() {
        return this.mouse.mask;
    }

    runFrame() {
        this.mouse.update();
        this.keyboard.update();
    }

    get mouseX() {
        return this.mouse.mouseX;
    }
    get mouseY() {
        return this.mouse.mouseY;
    }
    get mouseDown() {
        return this.mouse.mouseDown;
    }
    get mouseClicked() {
        return this.mouse.mouseClicked;
    }

    isKeyPressed(keyCode) {
        return this.keyboard.isPressed(keyCode);
    }
}

module.exports = GGM3Input;