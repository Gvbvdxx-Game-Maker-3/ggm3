var SpriteMasterConsts = require("../../../sprmaster.js");

var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("spritemaster_sprite", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var SPRITE = utils.getField("SPRITE", "");

    return JSON.stringify(SPRITE);
  },
});
