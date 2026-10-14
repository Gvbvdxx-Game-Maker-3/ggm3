
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_ystretch_by", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", "0");
    var VALUE_NUMBER = CoreFunctions.castToNumber(VALUE, true);

    return `sprite.scaleY += ${VALUE_NUMBER} / 100;`;
  },
});