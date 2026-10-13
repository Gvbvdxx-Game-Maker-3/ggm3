
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_sety", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var Y = util.getInput("Y", "0");

    return `sprite.y = +(${Y}) || 0;`;
  },
});