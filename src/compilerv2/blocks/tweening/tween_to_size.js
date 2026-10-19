var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("tween_to_size", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var VALUE = utils.getInput("VALUE", "0");
    var SECONDS = utils.getInput("SECONDS", "0");
    var EASING = utils.getField("EASING", "linear");
    
    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    return `${ALIVE_CHECK}await thread.tweenToSize(${VALUE}, ${SECONDS}, ${JSON.stringify(EASING)});${ALIVE_CHECK}`;
  },
});
