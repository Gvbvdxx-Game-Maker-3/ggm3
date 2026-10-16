var {
  compileSpriteXML,
  compileSpriteXMLToString,
  saveCurrentSpriteCode,
  compileAllSprites,
} = require("../selectedsprite.js");

function compileSprite(sprite) {
  compileSpriteXML(sprite);
}

function getSpriteFunctionsCode(sprite, instance) {
  return compileSpriteXMLToString(sprite, instance);
}

module.exports = {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
  getSpriteFunctionsCode,
};
