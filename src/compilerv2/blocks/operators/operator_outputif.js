var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_outputif", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var CONDITION = utils.getInput("CONDITION", "false");

    var PASS_OUTPUT = utils.getInput("PASS_OUTPUT", "null");
    var FAIL_OUTPUT = utils.getInput("FAIL_OUTPUT", "null");
    
    return `(${CONDITION}) ? (${PASS_OUTPUT}) : (${FAIL_OUTPUT})`;
  },
});