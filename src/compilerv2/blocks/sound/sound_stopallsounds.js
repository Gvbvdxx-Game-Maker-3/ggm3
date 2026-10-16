var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sound_stopallsounds", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    return `engine.stopAllSounds();`;
  },
});
