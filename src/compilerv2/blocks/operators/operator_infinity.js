var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_infinity", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return `Infinity`;
  },
});