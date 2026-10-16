var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("event_ggm3_broadcast_menu", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var BROADCAST_NAME = utils.getField("BROADCAST_NAME", "");

    return JSON.stringify(BROADCAST_NAME);
  },
});
