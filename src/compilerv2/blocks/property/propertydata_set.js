var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("propertydata_set", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var TARGET_SPRITE = utils.getInput("TARGET_SPRITE", "null");
    var VARIABLE = utils.getField("VARIABLE", "");
    var VALUE = utils.getInput("VALUE", "null");

    if (TARGET_SPRITE == '"__myself__"') {
        return `sprite.spriteProperties[${JSON.stringify(VARIABLE)}] = ${VALUE};`;
    } else {
        return `sprite.setSProperty(${TARGET_SPRITE}, ${JSON.stringify(VARIABLE)}, ${VALUE});`;
    }
  },
});
