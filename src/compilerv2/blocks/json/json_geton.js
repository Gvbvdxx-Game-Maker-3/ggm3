var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_geton", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var NAME = utils.getInput("NAME", "null");
    var OBJECT = utils.getInput("OBJECT", "{}");

    return `(${OBJECT})[${NAME}]`;
  },
});
