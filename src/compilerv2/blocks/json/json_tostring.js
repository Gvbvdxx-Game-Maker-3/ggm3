var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_tostring", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OBJECT = utils.getInput("OBJECT", "{}");

    return `JSON.stringify(${OBJECT})`;
  },
});
