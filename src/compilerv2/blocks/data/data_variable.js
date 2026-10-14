
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("data_variable", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var variable = utils.getFieldVariable("VARIABLE");
    if (!variable) {
        //We don't have that variable.
        //Just return 0.
        return "0";
    }

    var variableCode = `sprite.variables[${JSON.stringify(variable.id)}]`;

    return variableCode;
  },
});
