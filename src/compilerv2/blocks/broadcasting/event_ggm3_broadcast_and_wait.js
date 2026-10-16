var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("event_ggm3_broadcast_and_wait", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var BROADCAST_NAME = utils.getInput("BROADCAST_NAME", "");
    var BROADCAST_NAME_STRING = CoreFunctions.castToString(BROADCAST_NAME, false);

    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    return `${ALIVE_CHECK}await engine.broadcastAndWait(${BROADCAST_NAME_STRING});${ALIVE_CHECK}`;
  },
});
