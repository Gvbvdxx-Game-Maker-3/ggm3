var { TextureCanvas } = require("./texturecanvas.js");

class MouseState {
    constructor (input) {
        this.input = input;
        this.engine = input.engine;
        
        this.init();
    }

    update() {
        
    }

    init() {
        this.initState();
        this.initMask();
        this.update();
    }

    initState() {
        var state = {};
        state.x = 0;
        state.y = 0;
        state.down = false;

        this.state = state;
    }

    initMask() {
        //Create a mask so that we can do
        // collision checks for when hovering over sprites.

        var mask1x1 = TextureCanvas.render1x1PixelMask();
        this.mask1x1 = mask1x1;
        
        this.mask = new CollisionSprite(mask1x1.imageData);
    }

    write(data) {
        if (!data) {
            return;
        }

        var x = 0;
        var y = 0;
        var down = false;

        if (typeof data.x == "number" && typeof data.y == "number") {
            x = data.x;
            y = data.y;
        } else {
            
        }
    }
}

module.exports = MouseState;