var {
  compileSpriteXML,
  compileSpriteXMLToString,
  saveCurrentSpriteCode,
  compileAllSprites,
} = require("../selectedsprite.js");
var EditorUtils = require("../wjson/editorutil.js");

function compileSprite(sprite) {
  compileSpriteXML(sprite);
}

function getSpriteFunctionsCode(sprite, instance) {
  return compileSpriteXMLToString(sprite, instance);
}

function listUsedBroadcasts(sprite) {
  if (!sprite.editorData) {
    return engine.broadcastNames;
  }
  if (sprite.editorData.xml) {
    return engine.broadcastNames;
  }

  var blocks = EditorUtils.findBlocks(sprite.editorData.blocks, [
    "event_ggm3_broadcast_menu",
    "event_ggm3_whenbroadcasted"
  ]);

  var broadcastNames = [];

  for (var block of blocks) {
    var field = EditorUtils.getField("BROADCAST_NAME", block);

    if (field) {
      var name = field.value;
      if (broadcastNames.indexOf(name) == -1) {
        broadcastNames.push(name);
      }
    }
  }

  return broadcastNames;
}

module.exports = {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
  getSpriteFunctionsCode,
  listUsedBroadcasts
};
