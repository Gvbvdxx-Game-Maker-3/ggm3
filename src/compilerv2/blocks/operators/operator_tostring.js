var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_tostring", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", JSON.stringify(""));

    return CoreFunctions.castToString(VALUE, true);
  },
});
