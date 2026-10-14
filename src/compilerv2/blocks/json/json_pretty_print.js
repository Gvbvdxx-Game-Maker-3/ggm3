var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_pretty_print", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OBJECT = utils.getInput("OBJECT", "{}");
    var INDENT = utils.getInput("INDENT", '""');
    
    return `JSON.stringify(${OBJECT}, null, (${INDENT}) || 2)`;
  },
});
