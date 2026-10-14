var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_round", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var NUM = utils.getInput("NUM", "0");
    var NUM_NUMBER = CoreFunctions.castToNumber(NUM, true);

    return `Math.round(${NUM_NUMBER})`;
  },
});