var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("loader_sound_option", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var SOUND = utils.getField("SOUND", "");

    return JSON.stringify(SOUND);
  },
});
