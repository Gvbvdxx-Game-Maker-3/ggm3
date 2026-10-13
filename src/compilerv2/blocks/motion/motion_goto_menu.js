
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_goto_menu", {
  type: CBlockType.OUTPUT,
  func: function (util) {
    var TO = util.getField("TO", "");
    return JSON.stringify(TO);
  },
});