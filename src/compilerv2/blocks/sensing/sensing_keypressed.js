var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sensing_keypressed", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var KEY_OPTION = utils.getInput("KEY_OPTION", "");

    return `!!engine.keysPressed[${KEY_OPTION}]`;
  },
});