
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("engine_framerate_to", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var FPS = util.getInput("FPS", "0");
    var FPS_NUM = CoreFunctions.castToNumber(FPS, true);
    return `engine.setFramerate(${FPS_NUM});`;
  },
});
