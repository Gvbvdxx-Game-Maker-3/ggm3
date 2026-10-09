
var BlockCompiler = require("../compiler/compiler.js");
var CBlockType = require("../compiler/types.js");
var CoreFunctions = require("../compiler/corefunc.js");

BlockCompiler.defineBlock("event_whengamestarts", {
    type: CBlockType.STARTER_HAT,
    func: function (utils) {
        var insideCode = CoreFunctions.putThreadStack(utils.getHatContents(""));
        var BLOCK_ID = JSON.stringify(utils.getID());
        
        return `sprite.addStackListener("started", ${BLOCK_ID}, async function () {${insideCode}});`;
    }
});