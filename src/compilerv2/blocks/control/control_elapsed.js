var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_elapsed", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return `(engine.time.elapsed / 1000)`;
  },
});
