var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_random", {
  type: CBlockType.OUTPUT,
  func: function (utils) {

    var FROM = utils.getInput("FROM", "0");
    var FROM_NUMBER = CoreFunctions.castToNumber(FROM, false);

    var TO = utils.getInput("TO", "0");
    var TO_NUMBER = CoreFunctions.castToNumber(TO, false);
    
    return `thread.random(${FROM_NUMBER}, ${TO_NUMBER})`;
  },
});