
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("loader_deloadcostume", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var COSTUME = utils.getInput("COSTUME", "null");

    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils.block);
    
    return `${ALIVE_CHECK}await sprite.blockDeloadCostume(${COSTUME});${ALIVE_CHECK}`;
  },
});