
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_goto", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var TO = util.getInput("TO", "null");
    return `sprite.goTo(${TO});`;
  },
});