var JSZip = require("jszip");
var engine = require("../curengine.js");
var EventEmitter = require("eventemitter3");
var FromTo = require("./from-to.js");

const ENGINE_FILE_URL = "engine.js?v="+Date.now();

function getEngine() {
    return fetch(ENGINE_FILE_URL).then(res => res.text());
}

class ExportMainGenerator extends EventEmitter {
    constructor() {
        super();
        this.engineCode = null;
        this.canceled = false;
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
        this.canceled = false;
        this.engineCode = null;

        var wasCanceled = await this.cancelableAsyncChain([
            this.generateEngineMetadata.bind(this),
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
    }
}


module.exports = {
    ExportMainGenerator
};
