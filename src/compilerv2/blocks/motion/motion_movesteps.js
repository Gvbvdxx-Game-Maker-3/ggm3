
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_movesteps", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var STEPS = util.getInput("STEPS", "0");
    var STEPS_NUM = CoreFunctions.castToNumber(STEPS, false);
    return `sprite.moveSteps(${STEPS_NUM});`;
  },
});