var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

class TextureCanvasRenderResult {
  constructor(dx, dy, w, h) {
    this.imageData = ctx.getImageData(dx, dy, w, h);
    this.width = w;
    this.height = h;
  }
}

class TextureCanvas {
  static clearCanvas() {
    canvas.width = 1;
    canvas.height = 1;
    ctx.clearRect(0, 0, 1, 1);
  }

  static render1x1PixelMask() {
    canvas.width = 1;
    canvas.height = 1;
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(0, 0, 1, 1);
    var result = new TextureCanvasRenderResult(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    this.clearCanvas();
    return result;
  }

  static renderScaledImage(img, scale) {
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;

    ctx.imageSmoothingEnabled = false;
    if (typeof ctx.webkitImageSmoothingEnabled !== "undefined") {
      ctx.webkitImageSmoothingEnabled = false;
    }
    if (typeof ctx.mozImageSmoothingEnabled !== "undefined") {
      ctx.mozImageSmoothingEnabled = false;
    }
    if (typeof ctx.msImageSmoothingEnabled !== "undefined") {
      ctx.msImageSmoothingEnabled = false;
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    var result = new TextureCanvasRenderResult(
      0,
      0,
      canvas.width,
      canvas.height,
    );
    this.clearCanvas();

    return result;
  }
}

module.exports = { TextureCanvas };
