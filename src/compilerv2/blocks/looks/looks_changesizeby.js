var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_changesizeby", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var CHANGE = utils.getInput("CHANGE", "0");
    var CHANGE_NUMBER = CoreFunctions.castToNumber(CHANGE, true);

    return `sprite.size += ${CHANGE_NUMBER};`;
  },
});
