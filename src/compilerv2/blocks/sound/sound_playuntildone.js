var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sound_playuntildone", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SOUND_MENU = utils.getInput("SOUND_MENU", "0");
    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    return `${ALIVE_CHECK}await sprite.playSoundUntilDone(${SOUND_MENU});${ALIVE_CHECK}`;
  },
});
