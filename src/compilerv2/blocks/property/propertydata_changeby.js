var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("propertydata_changeby", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var TARGET_SPRITE = utils.getInput("TARGET_SPRITE", "null");
    var VARIABLE = utils.getField("VARIABLE", "");
    var VALUE = utils.getInput("VALUE", "null");

    if (TARGET_SPRITE == '"__myself__"') {
        var val = `sprite.spriteProperties[${JSON.stringify(VARIABLE)}]`;
        return `${val} = ${CoreFunctions.castToNumber(val, true)} + ${CoreFunctions.castToNumber(VALUE, true)};`;
    } else {
        return `sprite.setSProperty(${TARGET_SPRITE}, ${JSON.stringify(VARIABLE)}, ${VALUE});`;
    }
  },
});
