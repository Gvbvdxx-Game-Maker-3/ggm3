var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_parse_safe", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var STRING = utils.getInput("STRING", JSON.stringify("{}"));
    var DEFAULT = utils.getInput("DEFAULT", "{}");
    
    return `thread.jsonParseSafe(${STRING}, ${DEFAULT})`;
  },
});
