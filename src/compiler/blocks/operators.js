var JavascriptTranslation = {};
var utilFunctions = require("./util-functions.js");
var outputBlocks = require("./output_blocks.js");

//Basic math:

outputBlocks.push("operator_add");
JavascriptTranslation["operator_add"] = function (jsonblock, utils, options) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options);
  var NUM2 = utils.getInput(jsonblock, "NUM2", options);
  //Although this is GGM3, not Scratch, falling back to zero or converting to number automatically is more convient.
  return `((+(${NUM1}) || 0) + (+(${NUM2}) || 0))`;
};

outputBlocks.push("operator_subtract");
JavascriptTranslation["operator_subtract"] = function (
  jsonblock,
  utils,
  options
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options);
  var NUM2 = utils.getInput(jsonblock, "NUM2", options);
  return `((+(${NUM1}) || 0) - (+(${NUM2}) || 0))`;
};

outputBlocks.push("operator_multiply");
JavascriptTranslation["operator_multiply"] = function (
  jsonblock,
  utils,
  options
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options);
  var NUM2 = utils.getInput(jsonblock, "NUM2", options);
  return `((+(${NUM1}) || 0) * (+(${NUM2}) || 0))`;
};

outputBlocks.push("operator_divide");
JavascriptTranslation["operator_divide"] = function (
  jsonblock,
  utils,
  options
) {
  var NUM1 = utils.getInput(jsonblock, "NUM1", options);
  var NUM2 = utils.getInput(jsonblock, "NUM2", options);
  return `((+(${NUM1}) || 0) / (+(${NUM2}) || 0))`;
};

//Randomizing:

outputBlocks.push("operator_random");
JavascriptTranslation["operator_random"] = function (
  jsonblock,
  utils,
  options
) {
  var FROM = utils.getInput(jsonblock, "FROM", options);
  var TO = utils.getInput(jsonblock, "TO", options);
  return `thread.random(+(${FROM}) || 0, +(${TO}) || 0)`;
};

//Conditional:

outputBlocks.push("operator_equals");
JavascriptTranslation["operator_equals"] = function (
  jsonblock,
  utils,
  options
) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options);
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options);
  return `((${OPERAND1}) == (${OPERAND2}))`;
};

outputBlocks.push("operator_gt");
JavascriptTranslation["operator_gt"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options);
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options);
  return `((+(${OPERAND1}) || 0) > (+(${OPERAND2}) || 0))`;
};

outputBlocks.push("operator_lt");
JavascriptTranslation["operator_lt"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options);
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options);
  return `((+(${OPERAND1}) || 0) < (+(${OPERAND2}) || 0))`;
};

outputBlocks.push("operator_and");
JavascriptTranslation["operator_and"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options);
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options);
  return `((${OPERAND1}) && (${OPERAND2}))`;
};

outputBlocks.push("operator_or");
JavascriptTranslation["operator_or"] = function (jsonblock, utils, options) {
  var OPERAND1 = utils.getInput(jsonblock, "OPERAND1", options);
  var OPERAND2 = utils.getInput(jsonblock, "OPERAND2", options);
  return `((${OPERAND1}) || (${OPERAND2}))`;
};

outputBlocks.push("operator_not");
JavascriptTranslation["operator_not"] = function (jsonblock, utils, options) {
  var OPERAND = utils.getInput(jsonblock, "OPERAND", options);
  return `(!(${OPERAND}))`;
};

module.exports = JavascriptTranslation;
