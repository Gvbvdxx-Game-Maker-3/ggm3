var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_equals", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OPERAND1 = utils.getInput("OPERAND1", "0");
    var OPERAND2 = utils.getInput("OPERAND2", "0");

    return `((${OPERAND1}) == (${OPERAND2}))`;
  },
});
