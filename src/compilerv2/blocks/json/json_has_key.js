var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("json_has_key", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OBJECT = utils.getInput("OBJECT", "{}");
    var NAME = utils.getInput("NAME", "null");

    return `Object.prototype.hasOwnProperty.call(${OBJECT}, ${NAME})`;
  },
});
