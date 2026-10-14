var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_array_pop", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OBJECT = utils.getInput("OBJECT", "{}");
    
    return `(${OBJECT}).pop()`;
  },
});
