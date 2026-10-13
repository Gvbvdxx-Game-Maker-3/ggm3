var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_add", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var NUM1 = utils.getInput("NUM1", "0");
    var NUM1_NUM = CoreFunctions.castToNumber(NUM1, true);

    var NUM2 = utils.getInput("NUM2", "0");
    var NUM2_NUM = CoreFunctions.castToNumber(NUM2, true);

    return `(${NUM1_NUM} + ${NUM2_NUM})`;
  },
});