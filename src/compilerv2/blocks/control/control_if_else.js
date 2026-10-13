
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_if_else", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SUBSTACK = utils.getInput("SUBSTACK", "");
    var SUBSTACK2 = utils.getInput("SUBSTACK2", "");
    var CONDITION = utils.getInput("CONDITION", "false");

    var code = "";
    code += `if (${CONDITION}) {`;
    code += SUBSTACK; //The inside code is the input.
    code += "} else {";
    code += SUBSTACK2;
    code += "}";

    return code;
  },
});