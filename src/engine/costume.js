var CollisionSprite = require("./mask.js");
var { TextureCanvas } = require("./texturecanvas.js"); //Optimization: use a shared canvas rather than individual ones for rendering the graphics.

var idcount = 0;

class Costume {
  constructor(engine, dataURL, name, resolveFunction, linkID) {
    this.engine = engine;
    this.dataURL = dataURL;
    this.drawable = null;
    this.rotationCenterX = 0;
    this.rotationCenterY = 0;
    this.preferedScale = 1;
    this.currentScale = 1;
    this.mimeType = null;
    this.linkID = linkID;
    this.id =
      idcount + "_" + Date.now() + "_" + Math.round(Math.random() * 9999999);
    idcount += 1;

    this.name = name || "Costume";
    this.resolveFunction = resolveFunction;
    this.mask = null;
    this.loaded = false;
    this.willPreload = true;

    this.textureWidth = 1;
    this.textureHeight = 1;
    this.width = 1;
    this.height = 1;

    if (this.linkID) {
      var libCostume = this.engine.findLibraryCostume(this.linkID);
      this.mimeType = libCostume.mimeType;
    }
  }

  removeLibraryCostume() {
    if (this.libCostume) {
      this.src = this.libCostume;
      this.libCostume = null;
    }
  }

  renderImageAtScale() {
    if (this.disposed) {
      return;
    }
    if (this.drawable) {
      this.engine.disposeDrawable(this.drawable); //Make sure we aren't leaking memory when resetting the drawable.
    }
    var img = this.img;
    var renderResult = TextureCanvas.renderScaledImage(img, this.preferedScale);
    var imageData = renderResult.imageData;

    this.textureWidth = renderResult.width;
    this.textureHeight = renderResult.height;
    this.width = img.width;
    this.height = img.height;

    this.mask = new CollisionSprite(imageData);

    this.drawable = this.engine.newDrawable(imageData);
    this.loading = false;
    this.loaded = true;
    this.currentScale = this.preferedScale;
  }

  getFinalRotationCenter() {
    return [
      this.currentScale * this.rotationCenterX,
      this.currentScale * this.rotationCenterY,
    ];
  }

  loadImage(whenfinished) {
    if (this.disposed) {
      return;
    }
    this.loading = true;
    if (this.img) {
      this.img.src = "";
    }
    var _this = this;
    var engine = this.engine;
    var img = document.createElement("img");
    this.img = img;
    img.onload = function () {
      _this.renderImageAtScale(_this.preferedScale);
      if (_this.resolveFunction) {
        _this.resolveFunction(true);
        _this.resolveFunction = null;
        //This should patch the issue where deloading and then loading in costumes in game resets rotation center.
        _this.rotationCenterX = img.width / 2;
        _this.rotationCenterY = img.height / 2;
      }
      if (whenfinished) {
        whenfinished();
      }
    };
    img.onerror = function () {
      if (_this.resolveFunction) {
        _this.resolveFunction(false);
        _this.resolveFunction = null;
      }
      if (whenfinished) {
        whenfinished();
      }
    };
    if (this.linkID) {
      var libCostume = this.engine.findLibraryCostume(this.linkID);
      img.src = libCostume.src;
      this.dataURL = "";
    } else {
      img.src = this.dataURL;
    }
  }

  getSrc() {
    if (this.linkID) {
      var libCostume = this.engine.findLibraryCostume(this.linkID);
      this.mimeType = libCostume.mimeType;
      return libCostume.src;
    } else {
      return this.dataURL;
    }
  }

  deloadCostume() {
    if (this.disposed) {
      return;
    }
    if (this.img) {
      this.img.onload = function () {};
      this.img.onerror = function () {};
      this.img.src = "";
      this.img = null;
    }
    if (this.drawable) {
      this.engine.disposeDrawable(this.drawable);
      this.drawable = null;
    }
    this.mask = null;
    this.loading = false;
    this.loaded = false;
  }

  rerenderAtResolution(res) {
    if (this.disposed) {
      return;
    }
    if (this.loading) {
      return;
    }
    if (this.loaded) {
      return;
    }
  }

  loadCostume() {
    if (this.disposed) {
      return;
    }
    if (this.loading) {
      return;
    }
    if (this.loaded) {
      return;
    }
    return new Promise((resolve) => {
      this.loadImage(resolve);
    });
  }

  dispose() {
    this.disposed = true;
    if (this.drawable) {
      this.engine.disposeDrawable(this.drawable);
    }
    if (this.img) {
      this.img.onload = function () {};
      this.img.onerror = function () {};
      this.img.src = "";
      this.img = null;
    }
    this.resolveFunction = null;
    this.drawable = null;
    this.mask = null;
  }
}

module.exports = Costume;
