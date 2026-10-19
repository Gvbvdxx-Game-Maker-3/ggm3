var SpriteMasterConsts = require("../../../sprmaster.js");

var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("spritemaster_getclonesofsprite", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var SPRITE = utils.getInput("SPRITE", "sprite");
    
    if (SPRITE == '"__myself__"') {
        return `Array.from(sprite.clones)`;
    }
    return `(spriteMaster.getClonesOf(${SPRITE}))`;
  },
});
