
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_gotoxy", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var X = util.getInput("X", "0");
    var Y = util.getInput("Y", "0");

    return `sprite.x = +(${X}) || 0; sprite.y = +(${Y}) || 0;`;
  },
});