var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_direction", {
  type: CBlockType.OUTPUT,
  func: function (util) {
    return `sprite.direction`;
  },
});
