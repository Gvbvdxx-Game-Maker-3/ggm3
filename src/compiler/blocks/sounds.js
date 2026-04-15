var JavascriptTranslation = {};
var utilFunctions = require("./util-functions.js");
var outputBlocks = require("./output_blocks.js");

outputBlocks.push("sound_sounds_menu");
JavascriptTranslation["sound_sounds_menu"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getField(jsonblock, "SOUND_MENU", options);
  return JSON.stringify(SOUND_MENU);
};

JavascriptTranslation["sound_play"] = function (jsonblock, utils, options) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  return `sprite.playSound(${SOUND_MENU});`;
};

JavascriptTranslation["sound_playuntildone"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  return `await sprite.playSoundUntilDone(${SOUND_MENU});${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["sound_stopsound"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  return `sprite.stopSound(${SOUND_MENU});`;
};

JavascriptTranslation["sound_stopallsounds"] = function (
  jsonblock,
  utils,
  options,
) {
  return `engine.stopAllSounds();`;
};

JavascriptTranslation["sound_stopallsoundsinsprite"] = function (
  jsonblock,
  utils,
  options,
) {
  return `sprite.stopAllSounds();`;
};

JavascriptTranslation["sound_ggm3effect_set"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "0");
  return `sprite.setSoundEffect(${SOUND_MENU}, ${JSON.stringify(EFFECT)}, ${VALUE});`;
};

JavascriptTranslation["sound_ggm3effect_change"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  var BY = utils.getInput(jsonblock, "BY", options, "0");
  return `sprite.changeSoundEffect(${SOUND_MENU}, ${JSON.stringify(EFFECT)}, ${BY});`;
};

outputBlocks.push("sound_ggm3effect_get");
JavascriptTranslation["sound_ggm3effect_get"] = function (
  jsonblock,
  utils,
  options,
) {
  var SOUND_MENU = utils.getInput(jsonblock, "SOUND_MENU", options, "0");
  var EFFECT = utils.getField(jsonblock, "EFFECT", options);
  return `sprite.getSoundEffect(${SOUND_MENU}, ${JSON.stringify(EFFECT)});`;
};

module.exports = JavascriptTranslation;
