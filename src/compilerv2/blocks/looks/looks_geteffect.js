
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_geteffect", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var EFFECT = utils.getField("EFFECT", "_noeffect");

    return `sprite.effects[${JSON.stringify(EFFECT)}]`;
  },
});