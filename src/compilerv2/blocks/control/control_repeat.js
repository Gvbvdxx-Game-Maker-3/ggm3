var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_repeat", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SUBSTACK = utils.getInput("SUBSTACK", "");
    var TIMES = utils.getInput("TIMES", "0");

    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    var code = "";
    code += ALIVE_CHECK;
    code += `await thread.repeatTimes(${TIMES}, async function () {`;
    code += SUBSTACK;
    code += "});";
    code += ALIVE_CHECK;

    return code;
  },
});
