
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_seteffectto", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var EFFECT = utils.getField("EFFECT", "_noeffect");

    var VALUE = utils.getInput("VALUE", "0");
    var VALUE_NUMBER = CoreFunctions.castToNumber(VALUE, true);

    return `sprite.effects[${JSON.stringify(EFFECT)}] = ${VALUE_NUMBER};`;
  },
});