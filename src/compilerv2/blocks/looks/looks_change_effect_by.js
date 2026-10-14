var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_change_effect_by", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var EFFECT = utils.getField("EFFECT", "_noeffect");

    var BY = utils.getInput("BY", "0");
    var BY_NUMBER = CoreFunctions.castToNumber(BY, true);

    return `sprite.effects[${JSON.stringify(EFFECT)}] += ${BY_NUMBER};`;
  },
});
