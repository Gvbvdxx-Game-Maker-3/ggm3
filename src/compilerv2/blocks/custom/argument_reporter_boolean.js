
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");
const { values } = require("../../../compiler/blocks/starters.js");

BlockCompiler.defineBlock("argument_reporter_boolean", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var field = utils.getField("VALUE", "");
    
    return `thread.customBlockValues[${JSON.stringify(field)}]`;
  },
});