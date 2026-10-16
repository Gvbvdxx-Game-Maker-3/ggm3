var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sound_ggm3effect_change", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SOUND_MENU = utils.getInput("SOUND_MENU", "0");
    
    var EFFECT = utils.getField("EFFECT", "_effect");
    var EFFECT_JS_STRING = JSON.stringify(EFFECT);

    var BY = utils.getInput("BY", "0");
    
    return `sprite.changeSoundEffect(${SOUND_MENU}, ${EFFECT_JS_STRING}, ${BY});`;
  },
});
