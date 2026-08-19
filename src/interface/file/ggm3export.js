var JSZip = require("jszip");
var engine = require("../curengine.js");
var EventEmitter = require("eventemitter3");
var FromTo = require("./from-to.js");
var DataURL = require("./dataurl.js");
var { getSpriteFunctionsCode } = require("./spritestuff.js");

const ENGINE_FILE_URL = "engine.js?v=" + Date.now();
const ASSET_PATH = "assets/";

function findCode(mod) {
  if (typeof mod.default !== "undefined") {
    return mod.default;
  }
  return mod;
}

var GAME_CODE_BASE = findCode(require("!!raw-loader!./exported-game-base/game.base.js"));

var RUNTIME_CODE_BASE = findCode(require("!!raw-loader!./exported-game-base/runtime.base.js"));

var RUNTIME_HTML_BASE = findCode(require("!!raw-loader!./exported-game-base/html.base.html"));


function getEngine() {
  return fetch(ENGINE_FILE_URL).then((res) => res.text());
}

function getFileExtension(mimeType,fallback) {
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
      return fallback || "data";
  }
}

const terserOptions = {
  compress: {
    // Set to false to stop variables from being moved out of their original lines,
    // which is usually what triggers the scoping clash in once wrappers
    hoist_vars: false,

    // Prevents functions from being radically collapsed into one-liners
    // if it risks altering variable visibility
    reduce_vars: false,
  },
  mangle: {
    keep_fnames: true,
  },
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
    console.error(e);
    console.error(code);
    
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
    this.htmlCode = null;
    this.runtimeCode = null;
    this.canceled = false;
    this._spriteJS = [];
    this._libraryJS = [];
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
      "index.html": this.htmlCode,
      "engine.js": this.engineCode,
      "game.js": this.gameCode,
      "runtime.js": this.runtimeCode,
      ...spriteFiles,
    };
  }

  cancel() {
    this.canceled = true;
  }

  getEngineCode() {
    var _this = this;
    if (this.engineCode) {
      return Promise.resolve(this.engineCode);
    } else {
      return getEngine().then((code) => {
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

  getStartingID() {
    var count = 0;
    var result = "";
    while (count < 10) {
      result += "" + (Math.round(Math.random() * 8) + 1);
      count += 1;
    }
    return +result;
  }

  getFileNum(num) {
    var n = (+num || 0) * this._idnum;
    return n;
  }

  getUidAddAmount () {
    return Math.round(Math.random() * 999);
  }

  async libraryToJS(library) {

    var costumeList = [];
    for (var costume of library.costumes) {
      this.uniqueIDCounter += this.getUidAddAmount();
      var uid = "limg" + this.getFileNum(this.uniqueIDCounter);
      var costumeJson = FromTo.toLibraryCostumeJSON(costume);
      if (this.useDataURL) {
        costumeJson.url = costume.src;
      } else {
        costumeJson.url = `${ASSET_PATH}${uid}.${getFileExtension(costume.mimeType, "png")}`;
        var buffer = await DataURL.dataURLToArrayBuffer(costume.src);
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
    for (var sound of library.sounds) {
      this.uniqueIDCounter += this.getUidAddAmount();
      var uid = "lsnd" + this.getFileNum(this.uniqueIDCounter);
      var soundJson = FromTo.toExportableSoundJSON(sound);
      if (this.useDataURL) {
        soundJson.url = sound.src;
      } else {
        soundJson.url = `${ASSET_PATH}${uid}.${getFileExtension(sound.mimeType, "mp3")}`;
        var buffer = await DataURL.dataURLToArrayBuffer(sound.src);
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

    var baseObject = FromTo.toLibraryJSON(library);

    baseObject.costumes = costumeList;
    baseObject.sounds = soundList;

    var js = JSON.stringify(baseObject); //No need for any actual non-json code.

    this._libraryJS.push(js);
  }

  async spriteToJS(sprite) {
    var baseObject = FromTo.toExportableSpriteJSON(sprite);

    var costumeList = [];
    for (var costume of sprite.costumes) {
      var costumeJson = FromTo.toExportableCostumeJSON(costume);
      if (!costumeJson.isLinked) {
        this.uniqueIDCounter += this.getUidAddAmount();
        var uid = "img" + this.getFileNum(this.uniqueIDCounter);
        if (this.useDataURL) {
          costumeJson.url = costume.dataURL;
        } else {
          costumeJson.url = `${ASSET_PATH}${uid}.${getFileExtension(costume.mimeType, "png")}`;
          var buffer = await DataURL.dataURLToArrayBuffer(costume.dataURL);
          this._spriteAssets.push({
            path: costumeJson.url,
            buffer: buffer,
          });
        }
      }
      costumeList.push(costumeJson);
      if (this.canceled) {
        return;
      }
    }

    var soundList = [];
    for (var sound of sprite.sounds) {
      var soundJson = FromTo.toExportableSoundJSON(sound);
      if (!soundJson.isLinked) {
        this.uniqueIDCounter += this.getUidAddAmount();
        var uid = "snd" + this.getFileNum(this.uniqueIDCounter);
        if (this.useDataURL) {
          soundJson.url = sound.dataURL;
        } else {
          soundJson.url = `${ASSET_PATH}${uid}.${getFileExtension(sound.mimeType, "png")}`;
          var buffer = await DataURL.dataURLToArrayBuffer(sound.dataURL);
          this._spriteAssets.push({
            path: soundJson.url,
            buffer: buffer,
          });
        }
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

    var middleCodeStuff = [];
    for (var id of Object.keys(exportableFunctions)) {
      var thing = "";
      thing += JSON.stringify(id);
      thing += ":";
      thing += "(" + exportableFunctions[id] + ")";
      middleCodeStuff.push(thing);
    }
    var exportableFunctionsJS = `{${middleCodeStuff.join(",")}}`;

    var js = `{sprite:(${JSON.stringify(baseObject)}),functions:(${exportableFunctionsJS})}`;

    this._spriteJS.push(js);
  }

  cancelableAsyncChain(functions) {
    return new Promise((resolve, reject) => {
      let index = 0;
      const next = () => {
        if (this.canceled) {
          resolve(true);
          return;
        }
        if (index >= functions.length) {
          resolve(false);
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
    var spritesCodeInArray = `[${this._spriteJS.join(",")}]`;
    var librariesCodeInArray = `[${this._libraryJS.join(",")}]`;
    var engineProperties = JSON.stringify(this.engineMetadata);
    var allCode = `{sprites:[${spritesCodeInArray}],libraries:${librariesCodeInArray},engineProps:${engineProperties}}`;
    var code = ("" + GAME_CODE_BASE).replaceAll('"|%GGM3Game%|"', allCode); //This isn't actually put in string, its just there to prevent the JS beautify errors.

    this.gameCode = await compress(code);
  }

  async generateRuntimeCode() {
    var code = ("" + RUNTIME_CODE_BASE);

    this.runtimeCode = await compress(code);
  }
  
  async generateHtmlCode () {

    var code = ("" + RUNTIME_HTML_BASE);

    this.htmlCode = code;
  }

  async generate() {
    this.cleanup();
    this.canceled = false;
    this._idnum = this.getStartingID();

    var wasCanceled = await this.cancelableAsyncChain([
      this.generateEngineCode.bind(this),
      this.generateEngineMetadata.bind(this),
      ...engine.sprites.map((sprite) => this.spriteToJS.bind(this, sprite)),
      ...engine.libraries.map((library) => this.libraryToJS.bind(this, library)),
      this.generateGameCode.bind(this),
      this.generateRuntimeCode.bind(this),
      this.generateHtmlCode.bind(this),
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
    this.runtimeCode = null;
    this.htmlCode = null;
    this._spriteJS = [];
    this._libraryJS = [];
    this._spriteAssets = [];
    this._idnum = 0;
  }
}

module.exports = {
  ExportMainGenerator,
};
