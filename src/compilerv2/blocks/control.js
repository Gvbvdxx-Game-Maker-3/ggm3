var BlockCompiler = require("../compiler/compiler.js");
var CBlockType = require("../compiler/types.js");
var CoreFunctions = require("../compiler/corefunc.js");

BlockCompiler.defineBlock("control_wait", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var DURATION = CoreFunctions.castToNumber(utils.getInput("DURATION", "0"));

    return `${CoreFunctions.aliveCheck(utils.block)}await thread.waitSeconds(${DURATION});${CoreFunctions.aliveCheck(utils.block)}`;
  },
});
