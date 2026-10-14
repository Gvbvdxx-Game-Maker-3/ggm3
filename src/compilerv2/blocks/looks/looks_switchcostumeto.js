
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_switchcostumeto", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var COSTUME = utils.getInput("COSTUME", "");

    return `sprite.costumeIndex = +(sprite.getCostumeIndex(${COSTUME})) || 0;`;
  },
});