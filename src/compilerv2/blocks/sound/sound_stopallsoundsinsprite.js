var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sound_stopallsoundsinsprite", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    return `sprite.stopAllSounds();`;
  },
});
