
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_xstretch", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return `(sprite.scaleX * 100)`;
  },
});