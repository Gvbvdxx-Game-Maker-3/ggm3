var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("tween_to_object", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SOURCE = utils.getInput("SOURCE", "0");
    var TARGET = utils.getInput("TARGET", "0");
    var SECONDS = utils.getInput("SECONDS", "0");
    var EASING = utils.getField("EASING", "linear");
    
    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    return `${ALIVE_CHECK}await thread.tweenToSource(${SOURCE}, ${TARGET}, +(${SECONDS}) || 0, ${JSON.stringify(EASING)});${ALIVE_CHECK}`;
  },
});
