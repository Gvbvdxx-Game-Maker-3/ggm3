var JavascriptTranslation = {};
var utilFunctions = require("./util-functions.js");

JavascriptTranslation["control_wait"] = function (jsonblock, utils, options) {
  var DURATION = utils.getInput(jsonblock, "DURATION", options);

  return `${utilFunctions.aliveCheck(jsonblock)}await thread.waitSeconds(${DURATION});${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_forever"] = function (
  jsonblock,
  utils,
  options
) {
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options);

  return `${utilFunctions.aliveCheck(jsonblock)}while (true) {${utilFunctions.aliveCheck(jsonblock)}if (thread.screenRefresh) {await thread.waitForNextFrame();}${utilFunctions.aliveCheck(jsonblock)}${SUBSTACK}}${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_repeat"] = function (jsonblock, utils, options) {
  var TIMES = utils.getInput(jsonblock, "TIMES", options);
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options);

  return `${utilFunctions.aliveCheck(jsonblock)}await thread.repeatTimes(${TIMES},async function (){${SUBSTACK}});${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_repeat_until"] = function (
  jsonblock,
  utils,
  options
) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options);
  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options);

  return `${utilFunctions.aliveCheck(jsonblock)}while (!(${CONDITION})) {${utilFunctions.aliveCheck(jsonblock)} if (thread.screenRefresh) {await thread.waitForNextFrame();} ${utilFunctions.aliveCheck(jsonblock)} ${SUBSTACK}}${utilFunctions.aliveCheck(jsonblock)}`;
};

JavascriptTranslation["control_if"] = function (jsonblock, utils, options) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options);

  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options);

  return `if (${CONDITION}) {${SUBSTACK}}`;
};

JavascriptTranslation["control_if_else"] = function (
  jsonblock,
  utils,
  options
) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options);

  var SUBSTACK = utils.getInput(jsonblock, "SUBSTACK", options);
  var SUBSTACK2 = utils.getInput(jsonblock, "SUBSTACK2", options);

  return `if (${CONDITION}) {${SUBSTACK}} else {${SUBSTACK2}}`;
};

JavascriptTranslation["control_wait_until"] = function (
  jsonblock,
  utils,
  options
) {
  var CONDITION = utils.getInput(jsonblock, "CONDITION", options);

  return `${utilFunctions.aliveCheck(jsonblock)}while (!(${CONDITION})) {${utilFunctions.aliveCheck(jsonblock)}await thread.waitForNextFrame();}${utilFunctions.aliveCheck(jsonblock)}`;
};

module.exports = JavascriptTranslation;
