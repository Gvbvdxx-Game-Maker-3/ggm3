var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sensing_touchingobjectmenu", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var TOUCHINGOBJECTMENU = utils.getField("TOUCHINGOBJECTMENU", "");
    return JSON.stringify(TOUCHINGOBJECTMENU);
  },
});
