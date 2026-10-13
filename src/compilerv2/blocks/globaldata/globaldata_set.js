
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("globaldata_set", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var VARIABLE = utils.getField("VARIABLE", "");
    var VALUE = utils.getInput("VALUE", "null");

    return `engine.globalVariables[${JSON.stringify(VARIABLE)}] = ${VALUE};`;
  },
});