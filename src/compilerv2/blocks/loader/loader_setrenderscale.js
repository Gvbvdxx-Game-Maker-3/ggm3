var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("loader_setrenderscale", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var COSTUME = utils.getInput("COSTUME", "null");

    return `sprite.blockRerenderCostume(${COSTUME});`;
  },
});
