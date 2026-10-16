var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("globaldata_get", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var VARIABLE = utils.getField("VARIABLE", "");

    return `engine.globalVariables[${JSON.stringify(VARIABLE)}]`;
  },
});
