var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_delete_path", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var OBJECT = utils.getInput("OBJECT", "{}");
    var PATH = utils.getInput("PATH", "null");
    
    return `thread.jsonDeletePath(${OBJECT},${PATH});`;
  },
});
