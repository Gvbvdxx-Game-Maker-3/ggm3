var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_stretch_to", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var XVALUE = utils.getInput("XVALUE", "0");
    var XVALUE_NUMBER = CoreFunctions.castToNumber(XVALUE, true);
    var YVALUE = utils.getInput("YVALUE", "0");
    var YVALUE_NUMBER = CoreFunctions.castToNumber(YVALUE, true);

    return `sprite.scaleX = ${XVALUE_NUMBER} / 100;sprite.scaleY = ${YVALUE_NUMBER} / 100;`;
  },
});
