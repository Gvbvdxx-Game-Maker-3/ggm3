var {
  compileSpriteXML,
  compileSpriteXMLToString,
  saveCurrentSpriteCode,
  compileAllSprites,
} = require("../selectedsprite.js");

function compileSprite(sprite) {
  compileSpriteXML(sprite);
}

function getSpriteFunctionsCode(sprite) {
  return compileSpriteXMLToString(sprite);
}

module.exports = {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
  getSpriteFunctionsCode
};
