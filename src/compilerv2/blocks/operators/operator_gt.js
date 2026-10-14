var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_gt", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OPERAND1 = utils.getInput("OPERAND1", "0");
    var OPERAND1_NUM = CoreFunctions.castToNumber(OPERAND1, true);
    var OPERAND2 = utils.getInput("OPERAND2", "0");
    var OPERAND2_NUM = CoreFunctions.castToNumber(OPERAND2, true);
    
    return `(${OPERAND1_NUM} > ${OPERAND2_NUM})`;
  },
});