var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_array_unshift", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", "null");
    var OBJECT = utils.getInput("OBJECT", "{}");

    return `(${OBJECT}).unshift(${VALUE});`;
  },
});
