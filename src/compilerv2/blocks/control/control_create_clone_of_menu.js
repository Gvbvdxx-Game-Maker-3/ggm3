
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_create_clone_of_menu", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var CLONE_OPTION = utils.getField("CLONE_OPTION", null);

    return JSON.stringify(CLONE_OPTION);
  },
});