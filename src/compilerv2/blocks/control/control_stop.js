var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("control_stop", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var STOP_OPTION = utils.getField("STOP_OPTION", "");
    var ALIVE_CHECK = CoreFunctions.aliveCheck(utils);

    if (STOP_OPTION == "this script") {
      return `thread.stop();${ALIVE_CHECK}`;
    }
    if (STOP_OPTION == "other scripts in sprite") {
      return `thread.stopEverythingButMe();${ALIVE_CHECK}`;
    }

    return "";
  },
});
