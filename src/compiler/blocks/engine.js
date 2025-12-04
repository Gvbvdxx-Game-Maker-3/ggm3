var JavascriptTranslation = {};
var utilFunctions = require("./util-functions.js");
var outputBlocks = require("./output_blocks.js");

outputBlocks.push("engine_framerate");
JavascriptTranslation["engine_framerate"] = function (jsonblock, utils, options) {
  return "(engine.frameRate)";
};

JavascriptTranslation["json_setto"] = function (jsonblock, utils, options) {
  var FPS = utils.getInput(jsonblock, "FPS", options, "0");
  return `engine.setFramerate(${FPS});`;
};

module.exports = JavascriptTranslation;
