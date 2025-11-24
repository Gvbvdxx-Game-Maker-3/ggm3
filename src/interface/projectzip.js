var JSZip = require("jszip");
var engine = require("./curengine.js");

async function saveProjectToZip() {
  var zip = new JSZip();
  var spritesArray = [];
  var i = 0;
  for (var sprite of engine.sprites) {
    var costumesObj = [];
    var spriteObj = {
      x: sprite.x,
      y: sprite.y,
      angle: sprite.angle,
      scaleX: sprite.scaleX,
      scaleY: sprite.scaleY,
      size: sprite.size,
      blocklyXML: sprite.blocklyXML,
      name: sprite.name,
    };
    var ci = 0;
    for (var costume of sprite.costume) {
      var costumeObj = {
        name: costume.name,
        id: costume.id,
        rotationCenterX: costume.rotationCenterX,
        rotationCenterY: costume.rotationCenterY,
        preferedScale: costume.preferedScale,
        willPreload: costume.willPreload,
      };
      var response = await fetch(costume.dataURL);
      var arrayBuffer = await response.arrayBuffer();

      var fileName = "sprite_" + i + "_costume_" + ci;
      zip.file(fileName, arrayBuffer);
      ci += 1;
    }
    spriteObj.costume = costumesObj;
    spritesArray.push(spriteObj);
    i += 1;
  }
  zip.file(
    "game.json",
    JSON.stringify({
      sprites: spritesArray,
    }),
  );
  return zip;
}

module.exports = {
  saveProjectToZip,
};
