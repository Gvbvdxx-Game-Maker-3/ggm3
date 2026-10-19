var SpriteMasterConsts = require("../../../sprmaster.js");

var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("spritemaster_spriteproperty", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var SPRITE = utils.getInput("SPRITE", "sprite");
    var PROPERTY_OPTION = utils.getField("PROPERTY_OPTION", "");

    var propertyCode = SpriteMasterConsts.SPRITE_MASTER_CODE[PROPERTY_OPTION];
    if (propertyCode) {
        if (SPRITE == '"__myself__"') {
            return `sprite.${propertyCode}`;
        }
        var output = `(spriteMaster.getSpriteSafe(${SPRITE})).${propertyCode}`;
        return output;
    } else {
        return `(0)`;
    }
  },
});
