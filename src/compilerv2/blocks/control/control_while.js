
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_while", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SUBSTACK = utils.getInput("SUBSTACK", "");
    var CONDITION = utils.getInput("CONDITION", "false");

    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils.block);

    var code = "";
    code += `while (${CONDITION}) {`;
    code += ALIVE_CHECK;

    code += SUBSTACK; //The inside code is the input.
    code += `if (thread.screenRefresh) {${CoreFunctions.threadWaitFrame(utils.block)}};`;
    
    code += ALIVE_CHECK;
    code += "}";

    return code;
  },
});