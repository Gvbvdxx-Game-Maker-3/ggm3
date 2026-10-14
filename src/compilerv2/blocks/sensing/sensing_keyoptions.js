var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sensing_keyoptions", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var KEY_OPTION = utils.getField("KEY_OPTION", "");

    return JSON.stringify(KEY_OPTION);
  },
});