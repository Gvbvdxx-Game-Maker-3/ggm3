var JSZip = require("jszip");
var engine = require("../curengine.js");
var EventEmitter = require("eventemitter3");
var FromTo = require("./from-to.js");
var { getSpriteFunctionsCode } = require("./spritestuff.js");

const ENGINE_FILE_URL = "engine.js?v="+Date.now();

function getEngine() {
    return fetch(ENGINE_FILE_URL).then(res => res.text());
}

const terserOptions = {
  compress: {
    passes: 2,
    properties: false,
  },
  mangle: true,
};

async function compress(code) {
    if (!window.Terser) { //Terser is a separate chunk, so it might not be loaded yet.
        return code;
    }
    try{
        var result = await window.Terser.minify(code, terserOptions);
        if (result.error) {
            return code;
        }
        return result.code;
    }catch(e){
        return code;
    }
}

class ExportMainGenerator extends EventEmitter {
    constructor() {
        super();
        this.engineCode = null;
        this.canceled = false;
        this._spriteJS = [];
    }

    cancel() {
        this.canceled = true;
    }

    getEngineCode() {
        if (this.engineCode) {
            return Promise.resolve(this.engineCode);
        } else {
            return getEngine().then(code => {
                this.engineCode = code;
                return code;
            });
        }
    }

    async generateEngineMetadata() {
        this.engineMetadata = FromTo.toEngineJSON();
    }

    async spriteToJS(sprite) {
        var baseObject = FromTo.toSpriteJSON(sprite);

        var functionsCode = getSpriteFunctionsCode(sprite);
        var exportableFunctions = {};
        for (var id of Object.keys(functionsCode)) {
            exportableFunctions[id] = sprite.getFunctionCode(functionsCode[id]);
        }

        var js = `{sprite:(${JSON.stringify(baseObject)}),functions:(${JSON.stringify(exportableFunctions)})}`;

        return js;
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

    async generate() {
        this.cleanup();
        this.canceled = false;

        var wasCanceled = await this.cancelableAsyncChain([
            this.generateEngineMetadata.bind(this),
            ...engine.getAllSprites().map(sprite => this.spriteToJS.bind(this, sprite)),
        ]);

        if (wasCanceled) {
            this.cleanup();
            return null;
        } else {
            var engineCode = await this.getEngineCode();
            return {
                engineCode,
                engineMetadata: this.engineMetadata,
            };
        }
    }

    cleanup () {
        this.cancel();
        this.engineCode = null;
        this._spriteJS = [];
    }
}


module.exports = {
    ExportMainGenerator
};
