var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_toboolean", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", "0");

    return CoreFunctions.castToBoolean(VALUE, true);
  },
});