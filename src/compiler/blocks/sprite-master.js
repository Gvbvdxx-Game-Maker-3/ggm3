var SpriteMasterConsts = require("../../sprmaster.js");

var JavascriptTranslation = {};
var utilFunctions = require("./util-functions.js");
var outputBlocks = require("./output_blocks.js");
var MYSELF_INPUT = JSON.stringify("__myself__");

outputBlocks.push("spritemaster_sprite");
JavascriptTranslation["spritemaster_sprite"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getField(jsonblock, "SPRITE", options);
  return JSON.stringify(SPRITE);
};

outputBlocks.push("spritemaster_spriteobjectof");
JavascriptTranslation["spritemaster_spriteobjectof"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  if (SPRITE == MYSELF_INPUT) {
    return `sprite`;
  }
  return `spriteMaster.findSpriteByName(${SPRITE})`;
};

outputBlocks.push("spritemaster_spriteproperty");
JavascriptTranslation["spritemaster_spriteproperty"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  var PROPERTY_OPTION = utils.getField(
    jsonblock,
    "PROPERTY_OPTION",
    options,
    "",
  );
  var propertyCode = SpriteMasterConsts.SPRITE_MASTER_CODE[PROPERTY_OPTION];
  if (propertyCode) {
    if (SPRITE == MYSELF_INPUT) {
      return `sprite.${propertyCode}`;
    }
    var output = `(spriteMaster.getSpriteSafe(${SPRITE})).${propertyCode}`;
    return output;
  } else {
    return `(0)`;
  }
};

outputBlocks.push("spritemaster_getclonesofsprite");
JavascriptTranslation["spritemaster_getclonesofsprite"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  if (SPRITE == MYSELF_INPUT) {
    return `Array.from(sprite.clones)`;
  }
  return `(spriteMaster.getClonesOf(${SPRITE}))`;
};

outputBlocks.push("spritemaster_getclonecountofsprite");
JavascriptTranslation["spritemaster_getclonecountofsprite"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  if (SPRITE == MYSELF_INPUT) {
    return `sprite.clones.length`;
  }
  return `spriteMaster.getCloneCountOf(${SPRITE})`;
};

outputBlocks.push("spritemaster_checktouchingsprite_equals_propertyvalue");
JavascriptTranslation["spritemaster_checktouchingsprite_equals_propertyvalue"] = function (
  jsonblock,
  utils,
  options,
) {
  var SPRITE = utils.getInput(jsonblock, "SPRITE", options, "null");
  var VARIABLE = utils.getField(jsonblock, "VARIABLE", options, "null");
  var VALUE = utils.getInput(jsonblock, "VALUE", options, "null");
  if (SPRITE == MYSELF_INPUT) {
    return `true`;
  }
  return `spriteMaster.isTouchingSpriteWithPropertySet(${SPRITE}, ${JSON.stringify(VARIABLE)}, ${VALUE})`;
};

module.exports = JavascriptTranslation;
