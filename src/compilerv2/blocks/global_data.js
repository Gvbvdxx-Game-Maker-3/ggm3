var BlockCompiler = require("../compiler/compiler.js");
var CBlockType = require("../compiler/types.js");
var CoreFunctions = require("../compiler/corefunc.js");

BlockCompiler.defineBlock("globaldata_get", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var VARIABLE = utils.getField("VARIABLE", "");

    return `engine.globalVariables[${JSON.stringify(VARIABLE)}]`;
  },
});

BlockCompiler.defineBlock("globaldata_set", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var VARIABLE = utils.getField("VARIABLE", "");
    var VALUE = utils.getInput("VALUE", "null");

    return `engine.globalVariables[${JSON.stringify(VARIABLE)}] = ${VALUE};`;
  },
});

BlockCompiler.defineBlock("globaldata_changeby", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var VARIABLE = utils.getField("VARIABLE", "");
    var VARIABLE_CODE = `engine.globalVariables[${JSON.stringify(VARIABLE)}]`;
    var VARIABLE_NUM = CoreFunctions.castToNumber(VARIABLE_CODE, true);
    
    var VALUE = utils.getInput("VALUE", "0");
    var VALUE_NUM = CoreFunctions.castToNumber(VALUE, true);

    return `${VARIABLE} = ${VARIABLE_NUM} + ${VALUE_NUM};`;
  },
});
