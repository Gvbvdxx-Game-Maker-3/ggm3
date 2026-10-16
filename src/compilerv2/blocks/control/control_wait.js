var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_wait", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var DURATION = utils.getInput("DURATION", "0");
    var DURATION_NUM = CoreFunctions.castToNumber(DURATION, true);

    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    return `${ALIVE_CHECK}await thread.waitSeconds(${DURATION_NUM});${ALIVE_CHECK}`;
  },
});
