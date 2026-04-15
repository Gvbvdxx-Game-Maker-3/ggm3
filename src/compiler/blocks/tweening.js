var JavascriptTranslation = {};
var utilFunctions = require("./util-functions.js");
var outputBlocks = require("./output_blocks.js");

JavascriptTranslation["tween_to_xy"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToXY(${X}, ${Y}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_stretch"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToStretchXY(${X}, ${Y}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_size"] = function (jsonblock, utils, options) {
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToSize(${VALUE}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_skew"] = function (jsonblock, utils, options) {
  var X = utils.getInput(jsonblock, "X", options, "undefined");
  var Y = utils.getInput(jsonblock, "Y", options, "undefined");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");

  return `${utilFunctions.aliveCheck()}await thread.tweenToSkewXY(${X}, ${Y}, ${SECONDS}, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_object"] = function (jsonblock, utils, options) {
  var SOURCE = utils.getInput(jsonblock, "SOURCE", options, "{}");
  var TARGET = utils.getInput(jsonblock, "TARGET", options, "{}");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");
  
  return `${utilFunctions.aliveCheck()}await thread.tweenToSource(${SOURCE}, ${TARGET}, +(${SECONDS}) || 0, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_property"] = function (jsonblock, utils, options) {
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  var TARGET = utils.getInput(jsonblock, "TARGET", options, "{}");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");
  
  return `${utilFunctions.aliveCheck()}await thread.tweenToProperty(${JSON.stringify(VARIABLE)}, ${TARGET}, +(${SECONDS}) || 0, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

JavascriptTranslation["tween_to_global_variable"] = function (jsonblock, utils, options) {
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  var TARGET = utils.getInput(jsonblock, "TARGET", options, "{}");
  var SECONDS = utils.getInput(jsonblock, "SECONDS", options, "undefined");
  var EASING = utils.getField(jsonblock, "EASING", options, "linear");
  
  return `${utilFunctions.aliveCheck()}await thread.tweenToGlobalVariable(${JSON.stringify(VARIABLE)}, ${TARGET}, +(${SECONDS}) || 0, ${JSON.stringify(EASING)});${utilFunctions.aliveCheck()}`;
};

module.exports = JavascriptTranslation;
