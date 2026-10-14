
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("looks_costume", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var COSTUME = utils.getField("COSTUME", "");

    return JSON.stringify(COSTUME);
  },
});