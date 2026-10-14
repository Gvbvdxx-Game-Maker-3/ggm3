var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_nextcostume", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    return `sprite.costumeIndex += 1;if (sprite.costumeIndex+1 > sprite.costumes.length) {sprite.costumeIndex = 0;}`;
  },
});
