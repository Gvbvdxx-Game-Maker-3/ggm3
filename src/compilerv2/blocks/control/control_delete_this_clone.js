var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_delete_this_clone", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    utils.doNext = false; //Don't compile anything after this.

    return `thread.deleteClone();${CoreFunctions.aliveCheck(utils.block)}`;
  },
});
