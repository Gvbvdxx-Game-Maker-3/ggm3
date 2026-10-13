var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_fixed", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var NUM = utils.getInput("NUM", "0");
    var NUM_NUMBER = CoreFunctions.castToNumber(NUM, true);

    var DECIMALS = utils.getInput("DECIMALS", "0");
    var DECIMALS_NUMBER = CoreFunctions.castToNumber(DECIMALS, true);
    
    return `${NUM_NUMBER}.toFixed(${DECIMALS_NUMBER})`;
  },
});