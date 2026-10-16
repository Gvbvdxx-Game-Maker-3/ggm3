var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_wait_until", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var CONDITION = utils.getInput("CONDITION", "false");
    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    var code = "";
    code += `while (!(${CONDITION})) {`;
    code += ALIVE_CHECK;
    code += CoreFunctions.threadWaitFrame(utils);
    code += "}";

    return code;
  },
});
