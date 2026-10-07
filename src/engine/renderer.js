var calculateMatrix = require("./calculatematrix.js");
var twgl = require("twgl.js");
var SHADERS = require("./shaders.js");

class EngineRenderer {
  constructor(engine, canvas) {
    this.engine = engine;
    this.canvas = canvas;
    this.gl = null;
  }

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

  updateCanvasSize() {
    var canvas = this.canvas;
    var { gameWidth, gameHeight, screenScale } = this.engine;
    var cwidth = gameWidth * screenScale;
    var cheight = gameHeight * screenScale;

    var needsUpdate = cwidth !== canvas.width || cheight !== canvas.height;
    if (needsUpdate) {
      canvas.width = cwidth;
      canvas.height = cheight;
      this.glCalculation();
      this.engine.emit(this.RESOLUTION_UPDATED);
    }
  }

  /**
   * Internal function used to get GL calculations so frames can be drawn correctly.
   * @returns {Void}
   */
  glCalculation() {
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
  }

  /**
   * Renders the game scene, this shouldn't be called directly.
   * @param {Number} elapsed The time elapsed since the last frame.
   * @returns {void}
   */
  drawGameFrame({
        spritesArray, //Sorted sprites to draw.
        isLoopFrame,
    }) {
    this.updateCanvasSize(); //This should happen right before we actually draw anything, this stops the black screen glitch from happening when resizing.

    var { canvas, gl, engine } = this;
    
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1, 1, 1, 0); // Use 0,0,0,0 to respect canvas style background
    gl.clear(gl.COLOR_BUFFER_BIT);

    this.drawSprites(spritesArray);
  }

  drawSprites(sprites) {
    var _this = this;
    sprites.forEach((spr) => {
        _this.renderSprite(spr);
      });
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
      engine,
      canvas
    } = this;
    var {gameWidth,gameHeight,screenScale} = engine;
    if (spr.costumes[spr.costumeIndex]) {
      var costume = spr.costumes[spr.costumeIndex];
      var drawable = costume.drawable;
      if (costume.drawable) {
        costume.drawable.update(); //This updates the costume texture if needed.
        var center = costume.getFinalRotationCenter();
        var matrixInfo = {
          x: spr.x * screenScale + canvas.width / 2,
          y: -spr.y * screenScale + canvas.height / 2,
          rotation: spr.angle * (Math.PI / 180),
          rotationCenterX: center[0],
          rotationCenterY: center[1],
          textureWidth: costume.textureWidth,
          textureHeight: costume.textureHeight,
          scaleX:
            ((spr.scaleX * (spr.size / 100)) / costume.currentScale) *
            screenScale,
          scaleY:
            ((spr.scaleY * (spr.size / 100)) / costume.currentScale) *
            screenScale,
          skewX: spr.skewX * (Math.PI / 180),
          skewY: spr.skewY * (Math.PI / 180),
        };
        var modelMatrix = calculateMatrix(matrixInfo);

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
}

module.exports = { EngineRenderer };
