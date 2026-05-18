/*!
 * @license
 * Gvbvdxx Game Maker 3 Engine
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var twgl = require("twgl.js");
var TWEEN = require("@tweenjs/tween.js");

var Drawable = require("./drawable.js");
var Sprite = require("./sprite.js");
var calculateMatrix = require("./calculatematrix.js");
var sMath = require("./smath.js");
var EventEmitter = require("eventemitter3");
var CollisionSprite = require("./mask.js");
var SHADERS = require("./shaders.js");

var created = false;

/**
 * The library for the runtime & rendering of Gvbvdxx Game Maker 3 games.
 * @emits GGM3Engine#SPRITE_CREATED
 * @emits GGM3Engine#RESOLUTION_UPDATED
 */
class GGM3Engine extends EventEmitter {
	/**
   * @readonly
   * @type {Boolean} Returns true if is GGM3Engine. */
	static get __isGGM3Engine__() {
		return true;
	}
	
  /**
   * @readonly
   * @type {String} Event emitted when a sprite is created. */
  SPRITE_CREATED = "SPRITE_CREATED";
  /**
   * @readonly
   * @type {String} Event emitted when a sprite is deleted. */
  SPRITE_DELETED = "SPRITE_DELETED";

  /**
   * @readonly
   * @type {String} Event emitted when the resolution is updated. */
  RESOLUTION_UPDATED = "RESOLUTION_UPDATED";
  /**
   * @readonly
   * @type {String} Event emitted when the cursor style is changed. */
  CURSOR_CHANGED = "CURSOR_CHANGED";
  /**
   * @readonly
   * @type {String} Event emitted when the frame rate is changed. */
  FRAMERATE_CHANGED = "FRAMERATE_CHANGED";

  /**
   * @readonly
   * @type {Number} The default width of the game. */
  DEFAULT_WIDTH = 640;
  /**
   * @readonly
   * @type {Number} The default height of the game. */
  DEFAULT_HEIGHT = 360;
  /**
   * @readonly
   * @type {Number} The default frame rate of the game. */
  DEFAULT_FRAMERATE = 60;
  /**
   * @readonly
   * @type {String} The default cursor style. */
  DEFAULT_CURSOR_STYLE = "default";

  /**
   * Creates a new instance of the Gvbvdxx Game Maker 3 engine.
   * @param {HTMLCanvasElement} canvas Canvas to render the game on.
   */
  constructor(canvas) {
    super();
    if (!created) {
      created = true;
    } else {
      throw new Error(
        "A GGM3Engine was already created. Use iframes to run multiple games at once.",
      );
    }
    this.canvas = canvas;
    if (!canvas) {
      this.canvas = document.createElement("canvas");
    }
    this.editMode = false;
    this._editDragging = null;
    this.drawables = [];
    this.sprites = [];
    this.frameRate = this.DEFAULT_FRAMERATE;
    this._frameRate = this.frameRate;
    this._iTime = 0;
    this.sMath = sMath;
    this.exportMode = false;
    this.tween = new TWEEN.Group();
    this.keyNames = {
      " ": "space-bar",
      ArrowLeft: "left-arrow",
      ArrowRight: "right-arrow",
      ArrowUp: "up-arrow",
      ArrowDown: "down-arrow",
    };
    this.keysPressed = {};
    this.initCanvas();
    this.generateMouseMask();
    this.startRenderLoop();
    this.spriteMap = {};
    this.globalVariables = {};
    this.propertyVariables = {};
    this.broadcastNames = [];
    this.broadcastQueue = [];

    this.gameWidth = this.DEFAULT_WIDTH;
    this.gameHeight = this.DEFAULT_HEIGHT;
    this.screenScale = 1;
    this.updateCanvasSize();
    this.calculateGLStuff();
    this.changeCursorStyle(this.DEFAULT_CURSOR_STYLE);
  }

  /**
   * Sets the cursor style value for the canvas.
   * @param {String} value Cursor style property to change to.
   */
  changeCursorStyle(value) {
    var cursorStyle = value ? "" + value : this.DEFAULT_CURSOR_STYLE;
    if (cursorStyle !== this.cursorStyle) {
      this.cursorStyle = cursorStyle;
      this.canvas.style.cursor = cursorStyle;
      this.emit(this.CURSOR_CHANGED, cursorStyle);
    }
  }

  /**
   * Sets the internal width of the game (unscaled), `updateCanvasSize` needs to be called right after this function.
   * @param {Number} v Width in pixels, if none provided or invalid number, it defaults to the original width.
   */
  setWidth(v) {
    this.gameWidth = +v || this.DEFAULT_WIDTH;
    if (this.gameWidth < 1) {
      this.gameWidth = 1;
    }
  }

  /**
   * Sets the internal height of the game (unscaled), `updateCanvasSize` needs to be called right after this function.
   * @param {Number} v Height in pixels, if none provided or invalid number, it defaults to the original height.
   */
  setHeight(v) {
    this.gameHeight = +v || this.DEFAULT_HEIGHT;
    if (this.gameHeight < 1) {
      this.gameHeight = 1;
    }
  }

  /**
   * Sets the FPS of the game, this is also used by some blocks of the game.
   * @param {Number} v New FPS value. If none provided or invalid, defaults to the original value.
   */
  setFramerate(v) {
    //Used by blocks
    this.frameRate = +v || this.DEFAULT_FRAMERATE;
    if (this.frameRate > 1000) {
      this.frameRate = 1000;
    }
    if (this.frameRate < 1) {
      this.frameRate = 1;
    }
  }

  /**
   * Stops all sounds for every sprite in the game.
   */
  stopAllSounds() {
    for (var sprite of this.getAllTopSprites()) {
      sprite.stopAllSounds();
    }
  }

  /**
   * Sends out a broadcast for every sprite in the game.
   * @param {String} name The name of the broadcast to send out.
   */
  broadcast(name) {
    this.getAllTopSprites().forEach((sprite) => {
      sprite.emitBroadcastListener(name);
    });
  }

  /**
   * Sends out a broadcast for every sprite in the game to the next frame.
   * @param {String} name The name of the broadcast to send out.
   */
  broadcastOnNextFrame(name) {
    this.broadcastQueue.push(() => {
      this.getAllTopSprites().forEach((sprite) => {
        sprite.emitBroadcastListener(name);
      });
    });
  }

  /**
   * Sends out a broadcast for every sprite in the game, and waits for it to complete.
   * @param {String} name The name of the broadcast to send out.
   */
  async broadcastAndWait(name) {
    var promises = [];
    this.getAllTopSprites().forEach((sprite) => {
      promises.push(sprite.emitBroadcastListener(name));
    });
    await Promise.all(promises);
  }

  /**
   * Retrieves all the possible broadcast names possible.
   * @returns {Array} Array of broadcast names.
   */
  getBroadcastNames() {
    return this.broadcastNames;
  }

  /**
   * Adds a broadcast name to the list of possible broadcast names.
   * @param {String} name The broadcast name to add.
   */
  addBroadcastName(name) {
    if (this.broadcastNames.indexOf(name) === -1) {
      this.broadcastNames.push(name);
    }
  }

  /**
   * Removes a possible broadcast name from the list of possible broadcast names.
   * @param {String} name The broadcast name to remove.
   */
  removeBroadcastName(name) {
    this.broadcastNames = this.broadcastNames.filter((n) => n !== name);
  }

  /**
   * This updates the game screen size if the game screen size needs to be updated.
   * Call this after setting `gameWidth`, `gameHeight`, or `screenScale`.
   */
  updateCanvasSize() {
    var { canvas, gameWidth, gameHeight, screenScale } = this;
    var cwidth = gameWidth * screenScale;
    var cheight = gameHeight * screenScale;

    var needsUpdate = cwidth !== canvas.width || cheight !== canvas.height;
    if (needsUpdate) {
      canvas.width = cwidth;
      canvas.height = cheight;
      this.calculateGLStuff();
      this.emit(this.RESOLUTION_UPDATED);
    }
  }

  /**
   * Returns true if there is a global variable with that name.
   * @param {String} name Global variable name to check.
   * @returns {Boolean} True or false.
   */
  hasGlobalVariable(name) {
    return Object.keys(this.globalVariables).indexOf(name) > -1;
  }

  /**
   * Creates a global variable, if already existing then it resets to zero.
   * @param {String} name New global variable name.
   */
  addGlobalVariable(name) {
    this.globalVariables[name] = 0;
  }

  /**
   * Removes a global variable by the name.
   * @param {String} name Target global variable name to delete.
   */
  removeGlobalVariable(name) {
    this.globalVariables[name] = true; //Blocks can set variables to undefined and may cause deletion to bug, so set it temporarily to true before deleting.
    delete this.globalVariables[name];
  }

  /**
   * Adds a possible sprite property name.
   * @param {String} name The new sprite property name.
   */
  addSpriteProperty(name) {
    this.propertyVariables[name] = true; //Values are unique for each sprite.
  }

  /**
   * Checks if the sprite property exists.
   * @param {String} name Name of sprite property check.
   * @returns {Boolean} True or false.
   */
  hasSpriteProperty(name) {
    if (this.propertyVariables[name]) {
      return true;
    }
    return false;
  }

  /**
   * Removes a possible sprite property name, and deletes the property from all sprites.
   * @param {String} name The sprite property name to remove.
   */
  removeSpriteProperty(name) {
    this.propertyVariables[name] = true;
    delete this.propertyVariables[name];
    for (var sprite of this.sprites) {
      sprite.removeProperty(name);
    }
  }

  /**
   * This function makes sure all sprites have unique names, and if there are any duplicates it renames them by adding " (1)", " (2)", etc to the end of the name. It also creates a map of sprite names to sprite objects for easy lookup.
   * This should be called whenever a new sprite is created, or a sprite is renamed.
   */
  makeUniqueSpriteNames() {
    var existingNames = [];
    var nameCounts = {};
    var spriteMap = {};
    this.sprites.forEach((sprite) => {
      if (existingNames.indexOf(sprite.name) !== -1) {
        if (nameCounts[sprite.name]) {
          nameCounts[sprite.name] += 1;
        } else {
          nameCounts[sprite.name] = 1;
        }
        sprite.name = sprite.name + ` (${nameCounts[sprite.name]})`;
      } else {
        existingNames.push(sprite.name);
      }
      spriteMap[sprite.name] = sprite;
    });
    this.spriteMap = spriteMap;
  }

  /**
   * Gets the x-coordinate of the mouse position.
   * @returns {Number} The x-coordinate of the mouse position.
   * @type {Number}
   */
  get mouseX() {
    return this.mouseMask.x;
  }
  /**
   * Gets the y-coordinate of the mouse position.
   * @returns {Number} The y-coordinate of the mouse position.
   * @type {Number}
   */
  get mouseY() {
    return -this.mouseMask.y;
  }
  /**
   * Gets whether the mouse is down.
   * @returns {Boolean} True if the mouse is down, false otherwise.
   * @type {Boolean}
   */
  get mouseIsDown() {
    return this.mouseMask.isDown;
  }

  /**
   * Stops the game by stopping all scripts, deleting all clones, and resetting all effects for every sprite in the game.
   */
  stopGame() {
    this.broadcastQueue = [];
    for (var sprite of this.sprites) {
      sprite.stopAllScripts();
      sprite.deleteClones();
      sprite.effects.reset();
    }
  }

  /**
   * Starts the game by stopping all scripts, deleting all clones, and resetting all effects for every sprite in the game.
   */
  startGame() {
    this.stopGame();
    this.makeUniqueSpriteNames();
    for (var sprite of this.sprites) {
      sprite.emitStackListener("beforestart");
    }
    for (var sprite of this.sprites) {
      sprite.emitStackListener("started");
    }
  }

  /**
   * Deletes a sprite from the game.
   * @param {Sprite} sprite The sprite to delete.
   * @returns {void}
   */
  deleteSprite(sprite) {
    if (!sprite.id) {
      return;
    }
    sprite.dispose();
    this.sprites = this.sprites.filter((s) => s.id !== sprite.id);
    this.emit(this.SPRITE_DELETED, sprite);
  }

  /**
   * Empties the project by deleting all sprites, resetting all variables, stopping the game, and resetting the resolution, framerate, and cursor style to default values.
   */
  emptyProject() {
    var _this = this;
    this.sprites.forEach((s) => {
      _this.deleteSprite(s);
    });
    this.sprites = [];
    this.spriteProperties = {};
    this.globalVariables = {};
    this.propertyVariables = {};
    this.broadcastNames = [];
    this.stopGame();
    this.setWidth(this.DEFAULT_WIDTH);
    this.setHeight(this.DEFAULT_HEIGHT);
    this.setFramerate(this.DEFAULT_FRAMERATE);
    this.changeCursorStyle(this.DEFAULT_CURSOR_STYLE);
  }

  /**
   * Creates a new empty sprite and adds it to the game.
   * @returns {Sprite} The newly created sprite.
   */
  createEmptySprite() {
    var spr = this.__createEmptySpriteNoEvent();
    this.emit(this.SPRITE_CREATED, spr);
    return spr;
  }

  /**
   * Creates a new empty sprite without emitting a sprite created event.
   * @returns {Sprite} The newly created sprite.
   */
  __createEmptySpriteNoEvent() {
    var spr = new Sprite(this, "Sprite " + (this.sprites.length + 1));
    this.sprites.push(spr);
    this.makeUniqueSpriteNames();
    return spr;
  }

  /**
   * Duplicates a sprite.
   * @param {Sprite} fromSprite The sprite to duplicate.
   * @returns {Sprite} The newly created sprite.
   */
  duplicateSprite(fromSprite) {
    var newSprite = this.__createEmptySpriteNoEvent();
    newSprite.name = fromSprite.name + " " + Math.round(Date.now());
    this.makeUniqueSpriteNames();

    newSprite.x = fromSprite.x + 10;
    newSprite.y = fromSprite.y - 10;
    newSprite.angle = fromSprite.angle;
    newSprite.scaleX = fromSprite.scaleX;
    newSprite.scaleY = fromSprite.scaleY;
    newSprite.size = fromSprite.size;
    newSprite.costumeIndex = fromSprite.costumeIndex;
    newSprite.alpha = fromSprite.alpha;
    newSprite.skewX = fromSprite.skewX;
    newSprite.skewY = fromSprite.skewY;

    for (var variable of Object.keys(fromSprite.variables)) {
      try {
        newSprite.variables[variable] = JSON.parse(
          JSON.stringify(fromSprite.variables[variable]),
        ); //This clones the variable value, including json values.
      } catch (e) {}
    }

    for (var variable of Object.keys(fromSprite.spriteProperties)) {
      try {
        newSprite.spriteProperties[variable] = JSON.parse(
          JSON.stringify(fromSprite.spriteProperties[variable]),
        ); //This clones the variable value, including json values.
      } catch (e) {}
    }

    fromSprite.costumes.forEach(async (fromCostume) => {
      var costume = await newSprite.addCostume(fromCostume.dataURL);
      costume.name = fromCostume.name;
      costume.rotationCenterX = fromCostume.rotationCenterX;
      costume.rotationCenterY = fromCostume.rotationCenterY;
      costume.preferedScale = fromCostume.preferedScale;
      costume.willPreload = fromCostume.willPreload;
      costume.renderImageAtScale();
    });

    fromSprite.sounds.forEach(async (fromSound) => {
      var sound = await newSprite.addSound(fromSound.src);
      sound.name = fromSound.name;
      sound.willPreload = sound.willPreload;
    });

    this.emit(this.SPRITE_CREATED, newSprite);
    return newSprite;
  }

  /**
   * Starts the render loop of the game, which updates and renders every sprite in the game every frame. The framerate can be changed by setting the `frameRate` property, but it defaults to 60 FPS.
   * The render loop uses a fixed timestep method, which means that if the game lags for some reason, it will update the game state multiple times in a row to catch up, and then render. This ensures that the game state is always consistent and not affected by lag spikes, but it also means that if the game is running too slow, it may skip rendering some frames to catch up.
   * @returns {void}
   */
  startRenderLoop() {
    const _this = this;

    let previous = performance.now();

    function loop() {
      setTimeout(loop, 1);
      var now = performance.now();

      var frameDuration = 1000 / _this.frameRate;

      let delta = now - previous;
      if (delta >= frameDuration) {
        previous = now;
        _this.render(delta);
      }
    }

    setTimeout(loop, 1);
  }

  /**
   * Creates a new drawable and adds it to the game.
   * @param {HTMLCanvasElement} canvas The canvas to use for the drawable.
   * @returns {Drawable} The newly created drawable.
   */
  newDrawable(canvas) {
    var drawable = new Drawable(this, canvas, this.drawables.length);
    this.drawables.push(drawable);
    return drawable;
  }

  /**
   * Disposes of a drawable, removing it from the game.
   * @param {Drawable} drawable The drawable to dispose of.
   */
  disposeDrawable(drawable) {
    drawable.dispose();
    this.drawables = this.drawables.filter((d) => d.id !== drawable.id);
  }

  /**
   * Disposes of all drawables, removing them from the game.
   * @returns {void}
   */
  disposeAllDrawables() {
    var t = this;
    Array.from(this.drawables).forEach((d) => t.disposeDrawable(d));
  }

  /**
   * Enables edit mode, which allows the user to click and drag sprites around. This is used in the editor, and can be toggled on and off.
   * @returns {void}
   */
  turnOnEditing() {
    this.editMode = true;
  }

  /**
   * Disables edit mode, which allows the user to click and drag sprites around. This is used in the editor, and can be toggled on and off.
   * @returns {void}
   */
  turnOffEditing() {
    this.editMode = false;
  }

  /**
   * Generates a simple 1x1 white pixel mouse mask for detecting mouse interactions with sprites.
   * @returns {void}
   */
  generateMouseMask() {
    var c = document.createElement("canvas");
    var ctx = c.getContext("2d");
    c.width = 1;
    c.height = 1;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 1, 1);
    this.mouseMask = new CollisionSprite(ctx.getImageData(0, 0, 1, 1));
    this.mouseMask.isDown = false;
    c.width = 0;
    c.height = 0;
    c.remove();
  }

  /**
   * Initializes the canvas for rendering.
   * @returns {void}
   */
  initCanvas() {
    if (this.gl) {
      return;
    }
    var canvas = this.canvas;
    canvas.width = 640;
    canvas.height = 360;
    const contextAttribs = {
      alpha: false,
      stencil: true,
      antialias: false,
      preserveDrawingBuffer: true,
    };
    var gl =
      canvas.getContext("webgl", contextAttribs) ||
      canvas.getContext("experimental-webgl", contextAttribs) ||
      canvas.getContext("webgl2", contextAttribs);

    var fragmentShader = SHADERS.FRAGMENT_SHADER;
    this._gl_spriteProgramInfo = twgl.createProgramInfo(gl, [
      SHADERS.VERTEX_SHADER,
      fragmentShader,
    ]);

    this.gl = gl;
  }

  /**
   * Internal function used to get webGL rendering information.
   * @returns {Void}
   */
  calculateGLStuff() {
    var gl = this.gl;

    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.CULL_FACE);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this._gl_position = [-0, -0, 1, -0, -0, 1, -0, 1, 1, -0, 1, 1];
    this._gl_texcoord = [
      0,
      0, // Bottom-left vertex maps to (0,0)
      1,
      0, // Bottom-right vertex maps to (1,0)
      0,
      1, // Top-left vertex maps to (0,1)
      0,
      1, // Top-left vertex maps to (0,1)
      1,
      0, // Bottom-right vertex maps to (1,0)
      1,
      1, // Top-right vertex maps to (1,1)
    ];
    this._gl_quadBufferInfo = twgl.createBufferInfoFromArrays(gl, {
      a_position: {
        // This now matches `attribute vec2 a_position`
        numComponents: 2,
        data: this._gl_position,
      },
      a_texCoord: {
        // This now matches `attribute vec2 a_texCoord`
        numComponents: 2,
        data: this._gl_texcoord,
      },
    });

    var projectionMatrix = twgl.m4.ortho(
      0,
      this.canvas.width,
      this.canvas.height,
      0,
      -1,
      1,
    );

    this._gl_projectionMatrix = projectionMatrix;

    this.render(1 / this.frameRate);
  }

  /**
   * Renders the game scene, this shouldn't be called directly.
   * @param {Number} elapsed The time elapsed since the last frame.
   * @returns {void}
   */
  render(elapsed) {
    var { canvas, gl } = this;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 0); // Use 0,0,0,0 to respect canvas style background
    gl.clear(gl.COLOR_BUFFER_BIT);

    this._iTime += elapsed / 1000;
    this.elapsedFrameTime = elapsed;
    if (this._frameRate !== this.frameRate) {
      this._frameRate = this.frameRate;
      this.emit(this.FRAMERATE_CHANGED, this._frameRate);
    }
    this.tween.update(this._iTime * 1000);

    var _this = this;
    while (this.broadcastQueue.length > 0) {
      var broadcastFunc = this.broadcastQueue.shift();
      broadcastFunc();
    }
    this.getAllTopSprites()
      .reverse()
      .forEach((spr) => {
        _this.tickSprite(spr);
        _this.renderSprite(spr);
      });
    if (this.editMode) {
      this.tickEditMode();
    } else {
      this._editDragging = null;
    }
  }

  /**
   * Finds a sprite by its name.
   * @param {String} name The name of the sprite to find.
   * @returns {Sprite|null} The found sprite or null if not found.
   */
  findSpriteByName(name) {
    if (name instanceof Sprite) {
      return name;
    }
    var spr = this.spriteMap[name];
    if (spr) {
      return spr;
    }
    for (var spr of this.sprites) {
      if (spr.name == name) {
        return spr;
      }
    }
    return null;
  }

  /**
   * Changes the mouse position.
   * @param {Number} cx The x-coordinate of the mouse position.
   * @param {Number} cy The y-coordinate of the mouse position.
   * @returns {void}
   */
  changeMousePosition(cx, cy) {
    this.mouseMask.x = (+cx || 0) / this.screenScale - this.gameWidth / 2;
    this.mouseMask.y = (+cy || 0) / this.screenScale - this.gameHeight / 2;
  }

  /**
   * Changes the mouse down state.
   * @param {Boolean} down The new mouse down state.
   * @returns {void}
   */
  changeMouseDown(down) {
    this.mouseMask.isDown = !!down;
  }

  /**
   * Changes the key pressed state.
   * @param {String} key The key to change.
   * @param {Boolean} down The new key pressed state.
   * @returns {void}
   */
  changeKeyPressed(key, down) {
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

  /**
   * Updates the state of a sprite.
   * @param {Sprite} sprite The sprite to update.
   * @returns {void}
   */
  tickSprite(sprite) {
    sprite.emitFrameListeners();
  }

  /**
   * Sorts the sprites by their z-index, so that they are rendered in the correct order. This should be called whenever a sprite's z-index is changed, or a new sprite is added to the game.
   * @returns {void}
   */
  sortLayers() {
    var i = 0;
    for (var sprite of this.getAllTopSprites()) {
      sprite.zIndex = i;
      i += 1;
    }
  }

  /**
   * Gets all top-level sprites.
   * @returns {Sprite[]} The list of top-level sprites.
   */
  getAllTopSprites() {
    var sprs = [];
    for (var spr of this.sprites) {
      for (var clone of spr.clones) {
        sprs.push(clone);
      }
      sprs.push(spr);
    }
    var topSprites = sprs
      .map((s) => s)
      .sort((sprite, sprite2) => sprite2.zIndex - sprite.zIndex);
    return topSprites;
  }

  /**
   * Gets the top-level sprites.
   * @returns {Sprite[]} The list of top-level sprites.
   */
  getTopSprites() {
    var topSprites = this.sprites
      .map((s) => s)
      .sort((sprite, sprite2) => sprite2.zIndex - sprite.zIndex);
    return topSprites;
  }

  /**
   * Checks for collisions between the mouse and sprites, and allows dragging of sprites in edit mode. This should only be called in edit mode, and is used for the editor to allow users to click and drag sprites around.
   * @returns {void}
   */
  tickEditMode() {
    if (this._editDragging) {
      if (this.mouseIsDown) {
        var { sprite, offsetx, offsety } = this._editDragging;
        sprite.x = this.mouseX + offsetx;
        sprite.y = this.mouseY + offsety;
        this.canvas.style.cursor = "grabbing";
      } else {
        this._editDragging = null;
      }
    } else {
      this._editDragging = null;
      var topSprites = this.getAllTopSprites()
        .reverse()
        .filter((s) => !s.hidden)
        .filter((s) => s.alpha > 70);
      var touchedSprite = null;
      var mouseMask = this.mouseMask;
      for (var sprite of topSprites) {
        sprite.alignMask();
        var mask = sprite.mask;
        if (mask && mouseMask) {
          if (mouseMask.collisionTest(mask)) {
            touchedSprite = sprite;
          }
        }
      }
      this.canvas.style.cursor = "unset";
      if (touchedSprite) {
        this.canvas.style.cursor = "grab";
      }
      if (this.mouseIsDown) {
        if (!this._previousMouseDown) {
          this._previousMouseDown = true;
          if (touchedSprite) {
            this._editDragging = {
              offsetx: touchedSprite.x - this.mouseX,
              offsety: touchedSprite.y - this.mouseY,
              sprite: touchedSprite,
            };
          }
        }
      } else {
        this._previousMouseDown = false;
      }
    }
  }

  /**
   * Renders a sprite.
   * @param {Sprite} spr The sprite to render.
   * @returns {void}
   */
  renderSprite(spr) {
    if (spr.hidden) {
      return;
    }
    if (spr.alpha <= 0) {
      return;
    }
    var {
      gl,
      _gl_spriteProgramInfo,
      _gl_projectionMatrix,
      _gl_quadBufferInfo,
      _iTime,
    } = this;
    if (spr.costumes[spr.costumeIndex]) {
      var costume = spr.costumes[spr.costumeIndex];
      var drawable = costume.drawable;
      if (costume.drawable) {
        costume.drawable.update(); //This updates the costume texture if needed.
        var center = costume.getFinalRotationCenter();
        var modelMatrix = calculateMatrix({
          x: spr.x * this.screenScale + this.canvas.width / 2,
          y: -spr.y * this.screenScale + this.canvas.height / 2,
          rotation: spr.angle * (Math.PI / 180),
          rotationCenterX: center[0],
          rotationCenterY: center[1],
          textureWidth: costume.canvas.width,
          textureHeight: costume.canvas.height,
          scaleX:
            ((spr.scaleX * (spr.size / 100)) / costume.currentScale) *
            this.screenScale,
          scaleY:
            ((spr.scaleY * (spr.size / 100)) / costume.currentScale) *
            this.screenScale,
          skewX: spr.skewX * (Math.PI / 180),
          skewY: spr.skewY * (Math.PI / 180),
        });

        //var modelMatrix = twgl.m4.identity();
        //modelMatrix = twgl.m4.scale(modelMatrix, [100, 100, 1]);
        var uniforms = {
          u_modelMatrix: modelMatrix,
          u_skin: drawable.texture,
          u_projectionMatrix: _gl_projectionMatrix,

          u_ghost: spr.alpha / 100,
          ...spr.effects.getRenderableEffects(),
        };

        //window.alert(JSON.stringify(uniforms));

        gl.useProgram(_gl_spriteProgramInfo.program);
        twgl.setBuffersAndAttributes(
          gl,
          _gl_spriteProgramInfo,
          _gl_quadBufferInfo,
        );
        twgl.setUniforms(_gl_spriteProgramInfo, uniforms);
        twgl.drawBufferInfo(gl, _gl_quadBufferInfo);
      }
    }
  }

  /**
   * Generates a unique ID.
   * @returns {String} The generated ID.
   */
  generateID() {
    var id = "";
    id += Date.now();
    id += "_";
    id += Math.round(Math.random() * 999999);
    return id;
  }
}

module.exports = {
  GGM3Engine,
};
