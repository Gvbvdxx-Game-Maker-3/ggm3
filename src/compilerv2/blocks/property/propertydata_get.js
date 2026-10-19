var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("propertydata_get", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var TARGET_SPRITE = utils.getInput("TARGET_SPRITE", "null");
    var VARIABLE = utils.getField("VARIABLE", "");

    if (TARGET_SPRITE == '"__myself__"') {
        return `sprite.spriteProperties[${JSON.stringify(VARIABLE)}]`;
    } else {
        return `sprite.getSProperty(${TARGET_SPRITE}, ${JSON.stringify(VARIABLE)})`;
    }
  },
});
