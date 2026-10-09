
var BlockCompiler = require("../compiler/compiler.js");
var CBlockType = require("../compiler/types.js");
var CoreFunctions = require("../compiler/corefunc.js");

BlockCompiler.defineBlock("math_number", {
    type: CBlockType.OUTPUT,
    func: function (utils) {
        var NUM = utils.getField("NUM", 0);

        return JSON.stringify(NUM);
    }
});

BlockCompiler.defineBlock("math_angle", {
    type: CBlockType.OUTPUT,
    func: function (utils) {
        var NUM = utils.getField("NUM", 0);

        return JSON.stringify(NUM);
    }
});

BlockCompiler.defineBlock("text", {
    type: CBlockType.OUTPUT,
    func: function (utils) {
        var TEXT = utils.getField("TEXT", "");
        
        return JSON.stringify(TEXT);
    }
});