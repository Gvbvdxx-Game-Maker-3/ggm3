
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("event_beforegamestarts", {
  type: CBlockType.STARTER_HAT,
  func: function (utils) {
    var insideCode = utils.getHatContents("");
    var fullInsideCode = CoreFunctions.putThreadStack(utils.block, insideCode);

    var BLOCK_ID = JSON.stringify(utils.getID());

    var code = "";
    code += `sprite.addStackListener(`
    code += `"beforestart",`;
    code += BLOCK_ID + ",";
    code += `async function () {`;
    code += fullInsideCode;
    code += `});`;
    

    return code;
  },
});