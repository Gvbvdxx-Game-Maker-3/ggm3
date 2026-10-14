var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("data_changevariableby", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var variable = utils.getFieldVariable("VARIABLE");
    if (!variable) {
      //We don't have that variable.
      return "";
    }

    var VALUE = utils.getInput("VALUE", "0");
    var VALUE_NUM = CoreFunctions.castToNumber(VALUE, true);

    var variableCode = `sprite.variables[${JSON.stringify(variable.id)}]`;
    var variableNumberCode = CoreFunctions.castToNumber(variableCode, true);

    return `${variableCode} = ${variableNumberCode} + ${VALUE_NUM};`;
  },
});
