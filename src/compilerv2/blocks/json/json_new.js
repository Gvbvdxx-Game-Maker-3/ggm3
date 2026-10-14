var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_new", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var TYPE = utils.getField("TYPE", "");
    if (TYPE == "object") {
      return "({})";
    }
    if (TYPE == "array") {
      return "([])";
    }
    return "null";
  },
});
