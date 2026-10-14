var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_costumenames", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    return `sprite.costumes.map((c) => c.name)`;
  },
});
