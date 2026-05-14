var JSZip = require("jszip");
var engine = require("../curengine.js");
var EventEmitter = require("eventemitter3");
var FromTo = require("./from-to.js");
var DataURL = require("./dataurl.js");
var { getSpriteFunctionsCode } = require("./spritestuff.js");

const ENGINE_FILE_URL = "engine.js?v=" + Date.now();
const ASSET_PATH = "assets/";

function getEngine() {
  return fetch(ENGINE_FILE_URL).then((res) => res.text());
}

function getFileExtension(mimeType) {
  switch (mimeType) {
    case "image/png":
      return "png";
    case "image/svg+xml":
      return "svg";
    case "image/webm":
      return "webm";
    case "image/jpeg":
      return "jpg";
    case "image/gif":
      return "gif";
    case "audio/wav":
      return "wav";
    case "audio/mpeg":
      return "mp3";
    default:
      return "data";
  }
}

const terserOptions = {
  compress: {
    passes: 2,
    properties: false,
  },
  mangle: true,
};

async function compress(code) {
  if (!window.Terser) {
    //Terser is a separate chunk, so it might not be loaded yet.
    return code;
  }
  try {
    var result = await window.Terser.minify(code, terserOptions);
    if (result.error) {
      return code;
    }
    return result.code;
  } catch (e) {
    return code;
  }
}

class ExportMainGenerator extends EventEmitter {
  static get ASSET_PATH() {
    return ASSET_PATH;
  }

  constructor() {
    super();
    this.engineCode = null;
    this.gameCode = null;
    this.canceled = false;
    this._spriteJS = [];
    this.useDataURL = true;
    this.uniqueIDCounter = 0;
    this._spriteAssets = [];
  }

  getFiles() {
    var spriteFiles = {};
    if (this._spriteAssets.length > 0) {
      spriteFiles[ASSET_PATH] = null;
      for (var asset of this._spriteAssets) {
        spriteFiles[asset.path] = asset.buffer;
      }
    }
    return {
      "engine.js": this.engineCode,
      "game.js": this.gameCode,
      ...spriteFiles,
    };
  }

  cancel() {
    this.canceled = true;
  }

  getEngineCode() {
    if (this.engineCode) {
      return Promise.resolve(this.engineCode);
    } else {
      return getEngine().then((code) => {
        this.engineCode = code;
        return code;
      });
    }
  }

  async generateEngineMetadata() {
    this.engineMetadata = FromTo.toEngineExportJSON();
  }

  async generateEngineCode() {
    this.engineCode = await this.getEngineCode();
  }

  async spriteToJS(sprite) {
    var baseObject = FromTo.toSpriteJSON(sprite);

    var costumeList = [];
    for (var costume of sprite.costumes) {
      this.uniqueIDCounter += 1;
      var uid = "c" + this.uniqueIDCounter;
      var costumeJson = FromTo.toExportableCostumeJSON(costume);
      if (this.useDataURL) {
        costumeJson.url = costume.dataURL;
      } else {
        costumeJson.url = `${ASSET_PATH}${uid}.${getFileExtension(costume.mimeType)}`;
        var buffer = await DataURL.dataURLToArrayBuffer(costume.dataURL);
        this._spriteAssets.push({
          path: costumeJson.url,
          buffer: buffer,
        });
      }
      costumeList.push(costumeJson);
      if (this.canceled) {
        return;
      }
    }

    var soundList = [];
    for (var sound of sprite.sounds) {
      this.uniqueIDCounter += 1;
      var uid = "s" + this.uniqueIDCounter;
      var soundJson = FromTo.toExportableSoundJSON(sound);
      if (this.useDataURL) {
        soundJson.url = sound.dataURL;
      } else {
        soundJson.url = `${ASSET_PATH}${uid}.${getFileExtension(sound.mimeType)}`;
        var buffer = await DataURL.dataURLToArrayBuffer(sound.dataURL);
        this._spriteAssets.push({
          path: soundJson.url,
          buffer: buffer,
        });
      }
      soundList.push(soundJson);
      if (this.canceled) {
        return;
      }
    }

    baseObject.costumes = costumeList;
    baseObject.sounds = soundList;

    var functionsCode = getSpriteFunctionsCode(sprite);
    var exportableFunctions = {};
    for (var id of Object.keys(functionsCode)) {
      exportableFunctions[id] = sprite.getFunctionCode(functionsCode[id]);
    }

    var js = `{sprite:(${JSON.stringify(baseObject)}),costumes:(${JSON.stringify(costumeList)}),sounds:(${JSON.stringify(soundList)}),functions:(${JSON.stringify(exportableFunctions)})}`;

    this._spriteJS.push(js);
  }

  cancelableAsyncChain(functions) {
    return new Promise((resolve, reject) => {
      let index = 0;
      const next = () => {
        if (this.canceled) {
          resolve(false);
          return;
        }
        if (index >= functions.length) {
          resolve(true);
          return;
        }
        const func = functions[index];
        index++;
        Promise.resolve(func()).then(next).catch(reject);
      };
      next();
    });
  }

  async generateGameCode() {
    var spritesCodeInArray = this._spriteJS.join(",");
    var code = `window.GGM3Game = [${spritesCodeInArray}];`;

    this.gameCode = await compress(code);
  }

  async generate() {
    this.cleanup();
    this.canceled = false;

    var wasCanceled = await this.cancelableAsyncChain([
      this.generateEngineMetadata.bind(this),
      ...(engine.sprites.map((sprite) => this.spriteToJS.bind(this, sprite))),
      this.generateGameCode.bind(this),
    ]);

    if (wasCanceled) {
      this.cleanup();
      return null;
    } else {
      var result = this.getFiles();
      this.cleanup();
      this.canceled = false;
      return result;
    }
  }

  cleanup() {
    this.cancel();
    this.engineCode = null;
    this._spriteJS = [];
    this._spriteAssets = [];
  }
}

module.exports = {
  ExportMainGenerator,
};
