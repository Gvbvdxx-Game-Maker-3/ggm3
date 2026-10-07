var twgl = require("twgl.js");

class Drawable {
  //This is probably unused but keeping it here just because.
  static getImageCanvas(img, scale = 1) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  constructor(engine, textureSource, id) {
    //Changed to textureSource because we can provide different types rather than just an canvas.
    this.engine = engine;
    this.gl = engine.renderer.gl;
    this.isOutdated = true;
    this.texture = null;
    this.textureSource = textureSource;
    this.disposed = false;

    // Create initial texture only if GL is available and canvas has size
    try {
      this.update();
    } catch (e) {
      // swallow errors during construction; update will be retried later
      console.warn("Drawable: initial update failed", e);
    }
  }
  markAsOutdated() {
    this.isOutdated = true;
  }
  update() {
    if (!this.isOutdated) return;

    if (!this.textureSource) {
      // Nothing to upload
      this.isOutdated = false;
      return;
    }

    if (this.texture) {
      try {
        this.gl.deleteTexture(this.texture);
        this.engine.activeTextures -= 1;
      } catch (e) {
        // ignore GL errors
      }
      this.texture = null;
    }

    try {
      var source = this.textureSource;

      this.texture = twgl.createTexture(this.gl, {
        src: source,
        mag: this.gl.NEAREST,
        min: this.gl.NEAREST,
        wrap: this.gl.CLAMP_TO_EDGE,
      });
      this.engine.activeTextures += 1;
    } catch (e) {
      console.warn("Drawable: failed to create texture", e);
      this.texture = null;
    }

    this.isOutdated = false;
  }
  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    try {
      if (this.texture) {
        try {
          this.gl.deleteTexture(this.texture);
          this.engine.activeTextures -= 1;
        } catch (e) {}
      }
    } finally {
      this.texture = null;
      this.textureSource = null;
      this.gl = null;
      this.engine = null;
    }
  }
}

module.exports = Drawable;
