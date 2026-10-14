var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_not", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OPERAND = utils.getInput("OPERAND", "false");
    
    return `(!(${OPERAND}))`;
  },
});