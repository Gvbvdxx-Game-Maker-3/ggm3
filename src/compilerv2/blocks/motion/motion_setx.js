var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_setx", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var X = util.getInput("X", "0");

    return `sprite.x = +(${X}) || 0;`;
  },
});
