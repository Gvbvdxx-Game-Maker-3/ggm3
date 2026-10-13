
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("motion_pointindirection", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var DIRECTION = util.getInput("DIRECTION", "0");

    return `sprite.direction = +(${DIRECTION}) || 0;`;
  },
});