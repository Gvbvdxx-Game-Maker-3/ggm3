var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sensing_mousedown", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return `engine.mouseIsDown`;
  },
});
