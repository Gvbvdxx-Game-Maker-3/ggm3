var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sensing_touchingobject", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var TOUCHINGOBJECTMENU = utils.getInput("TOUCHINGOBJECTMENU", "");
    return `sprite.isTouchingSprite(${TOUCHINGOBJECTMENU})`;
  },
});