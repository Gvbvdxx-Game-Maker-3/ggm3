var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_array_join", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var STRING = utils.getInput("STRING", '""');
    var STRING_STR = CoreFunctions.castToString(STRING, true);
    var USING = utils.getInput("USING", '""');
    var USING_STR = CoreFunctions.castToString(USING, false);
    
    return `${STRING_STR}.join(${USING_STR})`;
  },
});
