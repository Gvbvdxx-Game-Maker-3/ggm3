var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_turnright", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var DEGREES = util.getInput("DEGREES", "0");

    return `sprite.direction += +(${DEGREES}) || 0;`;
  },
});
