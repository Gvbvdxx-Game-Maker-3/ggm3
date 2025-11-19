var JavascriptTranslation = {};

JavascriptTranslation["motion_gotoxy"] = function (jsonblock, utils) {
  var X = utils.getInput(jsonblock, "X");
  var Y = utils.getInput(jsonblock, "Y");

  return `sprite.x = ${X}; sprite.y = ${Y};`;
};

JavascriptTranslation["math_number"] = function (jsonblock, utils) {
  var NUM = utils.getField(jsonblock, "NUM");
  return JSON.stringify(NUM);
};

module.exports = JavascriptTranslation;
