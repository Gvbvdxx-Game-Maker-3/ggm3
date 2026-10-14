
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_costumenumbername", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var NUMBER_NAME = utils.getField("NUMBER_NAME", null);

    if (NUMBER_NAME == "number") {
        return `sprite.costumeIndex`;
    }

    if (NUMBER_NAME == "name") {
        return `(sprite.costume?.name)`;
    }

    return `(sprite.costume?.name)`;
  },
});