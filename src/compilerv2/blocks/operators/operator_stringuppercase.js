var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_stringuppercase", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", JSON.stringify(""));
    var VALUE_STRING = CoreFunctions.castToString(VALUE, true);

    return `(${VALUE_STRING}.toUpperCase())`;
  },
});