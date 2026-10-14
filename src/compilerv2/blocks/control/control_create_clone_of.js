var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_create_clone_of", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var CLONE_OPTION = utils.getInput("CLONE_OPTION", '"_myself_"');

    return `sprite.createCloneOf(${CLONE_OPTION});`;
  },
});
