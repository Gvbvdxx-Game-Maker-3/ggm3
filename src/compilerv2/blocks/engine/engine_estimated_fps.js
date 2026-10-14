var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("engine_estimated_fps", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return `(engine.time.totalFps)`;
  },
});
