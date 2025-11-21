var JavascriptTranslation = {};
var utilFunctions = require("./util-functions.js");

JavascriptTranslation["math_number"] = function (jsonblock, utils, options) {
  var NUM = utils.getField(jsonblock, "NUM");
  return JSON.stringify(+NUM || 0);
};

JavascriptTranslation["math_angle"] = function (jsonblock, utils, options) {
  var NUM = utils.getField(jsonblock, "NUM");
  return JSON.stringify(+NUM || 0);
};

JavascriptTranslation["text"] = function (jsonblock, utils, options) {
  var TEXT = utils.getField(jsonblock, "TEXT");
  return JSON.stringify(TEXT);
};

module.exports = JavascriptTranslation;
