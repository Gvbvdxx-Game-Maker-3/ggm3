var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("loader_deloadsound", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SOUND = utils.getInput("SOUND", "");

    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils.block);
    return `${ALIVE_CHECK}await sprite.blockDeloadSound(${SOUND});${ALIVE_CHECK}`;
  },
});
