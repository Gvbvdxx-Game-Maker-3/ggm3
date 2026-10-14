var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_joinstring", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var VALUE1 = utils.getInput("VALUE1", JSON.stringify(""));
    var VALUE1_STRING = CoreFunctions.castToString(VALUE1, true);
    var VALUE2 = utils.getInput("VALUE2", JSON.stringify(""));
    var VALUE2_STRING = CoreFunctions.castToString(VALUE2, true);

    return `(${VALUE1_STRING} + ${VALUE2_STRING})`;
  },
});
