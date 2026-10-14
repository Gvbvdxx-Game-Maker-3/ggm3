
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_xstretch_by", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", "0");
    var VALUE_NUMBER = CoreFunctions.castToNumber(VALUE, true);

    return `sprite.scaleX += ${VALUE_NUMBER} / 100;`;
  },
});