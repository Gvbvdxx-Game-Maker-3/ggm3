var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_if", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SUBSTACK = utils.getInput("SUBSTACK", "");
    var CONDITION = utils.getInput("CONDITION", "false");

    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    var code = "";
    code += `if (${CONDITION}) {`;
    code += SUBSTACK; //The inside code is the input.
    code += "}";

    return code;
  },
});
