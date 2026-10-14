
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("loader_soundisloaded", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var SOUND = utils.getInput("SOUND", "");
            
    return `sprite.soundIsLoaded(${SOUND})`;
  },
});