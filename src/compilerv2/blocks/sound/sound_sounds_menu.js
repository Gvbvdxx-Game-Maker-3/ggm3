var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sound_sounds_menu", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var SOUND_MENU = utils.getField("SOUND_MENU", "");

    return JSON.stringify(SOUND_MENU);
  },
});
