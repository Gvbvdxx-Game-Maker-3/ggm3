var JSZip = require("jszip");
var engine = require("../curengine.js");

const RESOURCE_FOLDER = "resources";
const RESOURCE_SOUNDS_FOLDER = "sounds";
const RESOURCE_COSTUMES_FOLDER = "costumes";
const SPRITE_FILE = "game.json";

var { ProgressMonitor } = require("./progressmonitor.js");
var { arrayBufferToDataURL, dataURLToArrayBuffer } = require("./dataurl.js");

var {
  getCostumeData,
  getSoundData,
  loadCostume,
  loadSound,
} = require("./asset.js");

const {
  toEngineJSON,
  toSpriteJSON,
  toCostumeJSON,
  toSoundJSON,

  fromEngineJSON,
  fromSpriteJSON,
  fromCostumeJSON,
  fromSoundJSON,
} = require("./from-to.js");

var {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
} = require("./spritestuff.js");

function calculateSpriteSaveMax(sprite) {
  var max = 0;
  max += sprite.costumes.length;
  max += sprite.sounds.length;
  return max;
}

async function saveSpriteZip(sprite, zip, progress = new ProgressMonitor()) {
  saveCurrentSpriteCode(); //Save current code to be safe that its saved.

  var zip = new JSZip();
  zip.folder(RESOURCE_FOLDER);
  zip.folder(`${RESOURCE_FOLDER}/${RESOURCE_COSTUMES_FOLDER}`);
  zip.folder(`${RESOURCE_FOLDER}/${RESOURCE_SOUNDS_FOLDER}`);

  var max = calculateSpriteSaveMax(sprite);
  progress.calculatedMax(max);
  progress.current = 0;

  var spriteJson = toSpriteJSON(sprite); //add the sprite properties, without the sound and costume properties.

  //Manually create the costumes array.
  var costumeData = getCostumeData(sprite);
  spriteJson.costumes = [];

  for (var file of costumeData) {
    var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
    var filePath = `${RESOURCE_FOLDER}/${RESOURCE_COSTUMES_FOLDER}/${file.fileName}`;
    zip.file(filePath, arrayBuffer);
    progress.current += 1;

    var costumeJson = file.costumeJson; //get costume property data.
    costumeJson.file = filePath; //add file path to read later.
    spriteJson.costumes.push(costumeJson);
  }

  //Manually create the sounds array.
  var soundData = getSoundData(sprite);
  spriteJson.sounds = [];
  for (var file of soundData) {
    var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
    var filePath = `${RESOURCE_FOLDER}/${RESOURCE_SOUNDS_FOLDER}/${file.fileName}`;
    zip.file(filePath, arrayBuffer);
    progress.current += 1;

    var soundJson = file.soundJson; //get sound property data.
    soundJson.file = filePath; //add file path to read later.
    spriteJson.sounds.push(soundJson);
  }

  zip.file(SPRITE_FILE, JSON.stringify(spriteJson));
  return zip;
}

async function saveSpriteZipAsBlob(sprite, progress = new ProgressMonitor()) {
  var zip = await saveSpriteZip(sprite, new JSZip(), progress);
  var blob = await zip.generateAsync({ type: "blob" });
  progress.finish();
  return blob;
}

module.exports = {
  saveSpriteZip,
  saveSpriteZipAsBlob,
};
