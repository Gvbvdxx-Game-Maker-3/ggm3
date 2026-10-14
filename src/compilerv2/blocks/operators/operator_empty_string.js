var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_empty_string", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return JSON.stringify("");
  },
});