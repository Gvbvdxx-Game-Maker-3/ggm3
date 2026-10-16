var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("sound_ggm3effect_set", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var SOUND_MENU = utils.getInput("SOUND_MENU", "0");
    
    var EFFECT = utils.getField("EFFECT", "_effect");
    var EFFECT_JS_STRING = JSON.stringify(EFFECT);

    var VALUE = utils.getInput("VALUE", "0");
    
    return `sprite.setSoundEffect(${SOUND_MENU}, ${EFFECT_JS_STRING}, ${VALUE});`;
  },
});
