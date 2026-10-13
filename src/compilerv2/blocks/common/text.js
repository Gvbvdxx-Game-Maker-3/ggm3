var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("text", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var TEXT = utils.getField("TEXT", "");

    return JSON.stringify(TEXT);
  },
});