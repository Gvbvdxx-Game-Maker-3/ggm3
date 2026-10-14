var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_get_path", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OBJECT = utils.getInput("OBJECT", "{}");
    var PATH = utils.getInput("PATH", "null");
    var DEFAULT = utils.getInput("DEFAULT", "null");

    return `thread.jsonGetPath(${OBJECT},${PATH},${DEFAULT})`;
  },
});
