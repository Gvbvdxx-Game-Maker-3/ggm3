var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sensing_keyoptions", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var KEY_OPTION = utils.getField("KEY_OPTION", "");

    if (utils.engine) {

      var engine = utils.engine;
      if (!engine.KeyCode[KEY_OPTION]) {

        //Try to look up the key name since usually we can fall back on that.
        for (var keyArray of engine.KeyCode.ALL_KEYS) {
          var key = engine.KeyCode.getKeyObject(keyArray);
          if (key.friendlyName == KEY_OPTION) {
            return `${key.keyCode}`;
          }
        }

      }

    }

    if (CoreFunctions.isJavaScriptSafe(KEY_OPTION)) {
      return `engine.KeyCode.${KEY_OPTION}`;
    } else {
      return `engine.KeyCode[${JSON.stringify(KEY_OPTION)}]`;
    }
  },
});
