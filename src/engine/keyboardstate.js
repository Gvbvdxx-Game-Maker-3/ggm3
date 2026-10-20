
var KeyCode = require("./keycodes.js");

class KeyboardState {
    constructor (input) {
        this.input = input;
        this.engine = input.engine;

        this.init();
    }

    update() {
        var states = this.keyStates;
        var countStates = this.keyCountStates;
        for (var keyCode of Object.keys(states)) {
            if (states[keyCode]) {
                countStates[keyCode] += 1;
            } else {
                countStates[keyCode] = 0;
            }
        }
    }

    init() {
        this.keyStates = {};
        this.keyCountStates = {};
        var codeNumbers = KeyCode.allCodeNumbers();

        for (var codeNum of codeNumbers) {
            this.keyStates[codeNum] = false;
            this.keyCountStates[codeNum] = 0;
        }
    }

    isPressed(keyCode) {
        return (+this.keyCountStates[keyCode] || 0) !== 0;
    }

    write(data) {
        if (!data) {
            return;
        }

        var keyCode = null;
        if (typeof data.keyCode == "number") {
            keyCode = data.keyCode;
        }
        if (data.event) {
            var event = data.event;
            if (typeof event.keyCode == "number") {
                keyCode = event.keyCode;
            }
        }

        if (!keyCode) {
            return;
        }

        var state = false;
        if (data.state || data.isDown || data.down || data.pressed) {
            state = true;
        }

        var states = this.keyStates;
        if (typeof states[keyCode] !== "undefined") {
            states[keyCode] = state;
        }
    }
}

module.exports = KeyboardState;