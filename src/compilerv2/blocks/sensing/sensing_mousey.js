var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sensing_mousey", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return `engine.input.mouseY`;
  },
});
