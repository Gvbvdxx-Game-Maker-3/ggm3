var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sound_stopsound", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SOUND_MENU = utils.getInput("SOUND_MENU", "0");
    
    return `sprite.stopSound(${SOUND_MENU});`;
  },
});
