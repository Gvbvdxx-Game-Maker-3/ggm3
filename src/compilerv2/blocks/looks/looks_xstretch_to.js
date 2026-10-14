
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_xstretch_to", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", "0");
    var VALUE_NUMBER = CoreFunctions.castToNumber(VALUE, true);

    return `sprite.scaleX = ${VALUE_NUMBER} / 100;`;
  },
});