var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_skew_to", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var XVALUE = utils.getInput("XVALUE", "0");
    var XVALUE_NUMBER = CoreFunctions.castToNumber(XVALUE, false);

    var YVALUE = utils.getInput("YVALUE", "0");
    var YVALUE_NUMBER = CoreFunctions.castToNumber(YVALUE, false);

    return `sprite.skewX = ${XVALUE_NUMBER};sprite.skewY = ${YVALUE_NUMBER};`;
  },
});
