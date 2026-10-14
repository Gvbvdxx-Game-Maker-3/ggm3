var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_set_path", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var OBJECT = utils.getInput("OBJECT", "{}");
    var PATH = utils.getInput("PATH", "null");
    var VALUE = utils.getInput("VALUE", "null");

    return `thread.jsonSetPath(${OBJECT},${PATH},${VALUE});`;
  },
});
