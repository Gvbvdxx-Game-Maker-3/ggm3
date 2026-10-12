
var BlockCompiler = require("../compiler/compiler.js");
var CBlockType = require("../compiler/types.js");
var CoreFunctions = require("../compiler/corefunc.js");

BlockCompiler.defineBlock("engine_framerate", {
    type: CBlockType.OUTPUT,
    func: function (utils) {
        return `(engine.frameRate)`;
    }
});

BlockCompiler.defineBlock("engine_estimated_fps", {
    type: CBlockType.OUTPUT,
    func: function (utils) {
        return `(engine.estimatedFramerate)`;
    }
});

BlockCompiler.defineBlock("engine_framerate_to", {
    type: CBlockType.COMMAND,
    func: function (utils) {
        var FPS = util.getInput("FPS", '0');
        return `engine.setFramerate(${FPS});`;
    }
});