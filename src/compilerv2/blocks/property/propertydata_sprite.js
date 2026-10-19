var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("propertydata_sprite", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var TARGET_SPRITE = utils.getField("TARGET_SPRITE", "");

    return JSON.stringify(TARGET_SPRITE);
  },
});
