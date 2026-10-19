var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("event_ggm3_broadcast", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var BROADCAST_NAME = utils.getInput("BROADCAST_NAME", "null");
    var BROADCAST_NAME_STRING = CoreFunctions.castToString(BROADCAST_NAME, false);

    return `engine.broadcast(${BROADCAST_NAME_STRING});`;
  },
});
