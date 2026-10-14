var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_changexby", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var DX = util.getInput("DX", "0");

    return `sprite.x += +(${DX}) || 0;`;
  },
});
