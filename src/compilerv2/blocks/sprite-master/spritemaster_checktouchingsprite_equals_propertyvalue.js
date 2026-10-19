var SpriteMasterConsts = require("../../../sprmaster.js");

var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("spritemaster_checktouchingsprite_equals_propertyvalue", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var SPRITE = utils.getInput("SPRITE", "sprite");
    var VARIABLE = utils.getField("VARIABLE", "null");
    var VALUE = utils.getInput("VALUE", "null");
    
    if (SPRITE == '"__myself__"') {
        return `true`;
    }
    return `spriteMaster.isTouchingSpriteWithPropertySet(${SPRITE}, ${JSON.stringify(VARIABLE)}, ${VALUE})`;
  },
});
