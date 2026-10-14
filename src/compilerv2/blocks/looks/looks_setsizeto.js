
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_setsizeto", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SIZE = utils.getInput("SIZE", "0");
    var SIZE_NUMBER = CoreFunctions.castToNumber(SIZE, true);

    return `sprite.size = ${SIZE_NUMBER};`;
  },
});