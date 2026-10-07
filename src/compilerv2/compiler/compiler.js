
var {BlockCompilerInstance} = require("./compiler_instance.js");

class BlockCompiler {
    constructor () {
        this.blocks = {};
    }

    register (name, options) {
        if (typeof name !== "string") {
            throw new Error("First argument 'name' is not string");
        }
        if (typeof options !== "object") {
            throw new Error("Second argument 'options' is not object.");
        }

        var block = new BlockCompilerInstance(name, options);
        this.blocks[name] = block;
    }

    remove (name) {
        this.blocks[name] = "";
        delete this.blocks[name];
    }
}

module.exports = new BlockCompiler();