var CollisionSprite = require("./mask.js");
var { TextureCanvas } = require("./texturecanvas.js");

class MouseState {
    constructor (input) {
        this.input = input;
        this.engine = input.engine;
        
        this.init();
    }

    get mouseX() {
        return this.state.x;
    }
    get mouseY() {
        return this.state.y;
    }
    get mouseDown() {
        return this.state.down;
    }
    get mouseClicked() {
        return this.state.downCount == 1;
    }

    update() {
        var state = this.state;
        var latest = this.latest;

        if (latest.down) {
            state.downCount += 1;
            state.down = true;
        } else {
            state.downCount = 0;
            state.down = false;
        }

        state.x = latest.x;
        state.y = latest.y;

        this.updateMask();
    }

    updateMask() {
        var mask = this.mask;
        mask.x = this.mouseX;
        mask.y = -this.mouseY; //This is inverted in GGM3 coordinates so that positive is up and negative is down.
        mask.angle = 0;
        mask.scaleX = 1;
        mask.scaleY = 1;
    }

    isTouching(sprite) {
        var mask = this.mask;
        var spriteMask = sprite.mask;

        if (!spriteMask) {
            return false;
        }

        return mask.collisionTest(spriteMask);
    }

    init() {
        this.initLatest();
        this.initState();
        this.initMask();
        this.update();
    }

    initLatest() {
        //Direct event data, we actually use this.state for
        // reading the mouse positions for the frame.

        var latest = {};
        latest.x = 0;
        latest.y = 0;
        latest.down = false;

        this.latest = latest;
    }

    initState() {
        var state = {};
        state.x = 0;
        state.y = 0;
        state.down = false;
        state.downCount = 0;

        this.state = state;
    }

    initMask() {
        //Create a mask so that we can do
        // collision checks for when hovering over sprites.

        var mask1x1 = TextureCanvas.render1x1PixelMask();
        this.mask1x1 = mask1x1;
        
        this.mask = new CollisionSprite(mask1x1.imageData);
    }

    getEventPosition(event, onElement, expectedSize) {
        var client = onElement.getBoundingClientRect();
        var expectedWidth = expectedSize.width;
        var expectedHeight = expectedSize.height;

        var eventX = event.x || event.clientX;
        var eventY = event.y || event.clientY;

        var relativeX = eventX - client.x;
        var relativeY = eventY - client.y;

        var scaleX = client.width / expectedWidth;
        var realX = relativeX * scaleX;

        var scaleY = client.height / expectedHeight;
        var realY = relativeY * scaleY;

        if (realX < 0) {
            realX = 0;
        }
        if (realY < 0) {
            realY = 0;
        }

        if (realX > expectedWidth) {
            realX = expectedWidth;
        }
        if (realY > expectedHeight) {
            realY = expectedHeight;
        }

        var pos = {
            x: realX,
            y: realY,
        };
        return pos;
    }

    positionToGamePosition(cx,cy) {
        var engine = this.engine;
        
        var scaledX = cx / engine.screenScale;
        var scaledY = cy / engine.screenScale;

        var halfWidth = engine.gameWidth / 2;
        var halfHeight = engine.gameHeight / 2

        var x = scaledX - halfWidth;
        var y = scaledY - halfHeight;

        y = -y; //Above center: positive, Below center: negative.

        return {x,y};
    }

    write(data) {
        if (!data) {
            return;
        }

        var x = null;
        var y = null;
        var down = null;
        var engine = this.engine;

        if (typeof data.directX == "number" && typeof data.directY == "number") {
            //Directly provides game mouse coordinates.
            x = data.directX;
            y = data.directY;
        } else if (typeof data.x == "number" && typeof data.y == "number") {
            //Directly provides canvas mouse coordinates.
            var gamePos = this.positionToGamePosition(data.x, data.y);

            x = gamePos.x;
            y = gamePos.y;
        } else if (typeof data.event !== "undefined") {
            //Auto detect the position of the mouse.
            //Optionally can provide its own element for mouse detection.

            //This element must be layered on top of the canvas and match
            // its size for proper detection.

            var sourceElement = data.detectElement || engine.canvas;

            var elementBounding = sourceElement.getBoundingClientRect();
            var elementWidth = sourceElement.width || elementBounding.width;
            var elementHeight = sourceElement.height || elementBounding.height;

            var pos = this.getEventPosition(
                data.event,
                data.detectElement || engine.canvas,
                {
                    width: elementWidth,
                    height: elementHeight
                }
            );

            var gamePos = this.positionToGamePosition(pos.x, pos.y);

            x = gamePos.x;
            y = gamePos.y;
        }

        if (typeof data.down !== "undefined") {
            down = !!data.down;
        }

        var latest = this.latest;

        if (typeof x == "number" && typeof y == "number") {
            latest.x = x;
            latest.y = y;
        }

        if (typeof down == "boolean") {
            latest.down = down;
        }
    }
}

module.exports = MouseState;