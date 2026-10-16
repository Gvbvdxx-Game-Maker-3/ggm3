var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_forever", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SUBSTACK = utils.getInput("SUBSTACK", "");
    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    var code = "";
    code += "while (true) {"; //Loops infinitely.
    code += ALIVE_CHECK;

    code += SUBSTACK; //The inside code is the input.

    //Though that it would hang here if screen refresh was turned off,
    // some people may use this as an alternative while loop,
    // and use it for some tasks.
    // they exit the loop through a stopping block.
    code += `if (thread.screenRefresh) {${CoreFunctions.threadWaitFrame(utils)}};`;

    code += ALIVE_CHECK;
    code += "}";

    return code;
  },
});
