var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("loader_rendercostumescale", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var COSTUME = utils.getInput("COSTUME", "null");
    var SCALE = utils.getInput("SCALE", "0");

    return `sprite.setCostumeRenderScale(${COSTUME},${SCALE});`;
  },
});
