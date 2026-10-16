var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("event_ggm3_whenbroadcasted", {
  type: CBlockType.STARTER_HAT,
  func: function (utils) {
    var insideCode = utils.getHatContents("");
    var fullInsideCode = CoreFunctions.putThreadStack(utils, insideCode);

    var BLOCK_ID = JSON.stringify(utils.getID());

    var BROADCAST_NAME = utils.getField("BROADCAST_NAME", "");

    var code = "";
    code += `sprite.addBroadcastListener(`;
    code += JSON.stringify(BROADCAST_NAME) + ",";
    code += BLOCK_ID + ",";
    code += `async function () {`;
    code += fullInsideCode;
    code += `});`;

    return code;
  },
});
