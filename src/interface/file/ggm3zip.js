var JSZip = require("jszip");
var engine = require("../curengine.js");

const RESOURCE_FOLDER = "data";
const RESOURCE_SOUNDS_FOLDER = "snd";
const RESOURCE_COSTUMES_FOLDER = "img";
const GAME_FILE = "game.json";

var { ProgressMonitor } = require("./progressmonitor.js");
var { arrayBufferToDataURL, dataURLToArrayBuffer } = require("./dataurl.js");

var {
  getCostumeData,
  getLibraryCostumeData,
  getSoundData,
  getLibrarySoundData,
  loadCostume,
  loadSound,
  loadLibraryCostume,
  loadLibrarySound,
} = require("./asset.js");

const {
  toEngineJSON,
  toSpriteJSON,
  toCostumeJSON,
  toSoundJSON,
  toLibraryJSON,
  toLibraryCostumeJSON,
  toLibrarySoundJSON,

  fromEngineJSON,
  fromSpriteJSON,
  fromCostumeJSON,
  fromSoundJSON,
  fromLibraryJSON,
  fromLibraryCostumeJSON,
  fromLibrarySoundJSON,
} = require("./from-to.js");

var {
  compileSprite,
  saveCurrentSpriteCode,
  compileAllSprites,
} = require("./spritestuff.js");

function calculateProjectSaveMax() {
  var max = 0;
  for (var sprite of engine.sprites) {
    max += sprite.costumes.length;
    max += sprite.sounds.length;
  }
  for (var library of engine.libraries) {
    max += library.costumes.length;
    max += library.sounds.length;
  }
  return max;
}

//Writing a entire game file.

async function saveProjectZip(progress = new ProgressMonitor()) {
  saveCurrentSpriteCode(); //Save current code to be safe that its saved.

  var zip = new JSZip();
  zip.folder(RESOURCE_FOLDER);

  var max = calculateProjectSaveMax();
  progress.calculatedMax(max);
  progress.current = 0;

  var libraryArray = [];
  var libraryIndex = 0;
  for (var library of engine.libraries) {
    var libraryJson = toLibraryJSON(library);

    zip.folder(`${RESOURCE_FOLDER}/lib${libraryIndex}`);
    zip.folder(
      `${RESOURCE_FOLDER}/lib${libraryIndex}/${RESOURCE_COSTUMES_FOLDER}`,
    );
    zip.folder(
      `${RESOURCE_FOLDER}/lib${libraryIndex}/${RESOURCE_SOUNDS_FOLDER}`,
    );

    var costumeData = getLibraryCostumeData(library, libraryIndex);
    libraryJson.costumes = [];
    for (var file of costumeData) {
      var costumeJson = file.json;
      var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
      var filePath = `${RESOURCE_FOLDER}/lib${libraryIndex}/${RESOURCE_COSTUMES_FOLDER}/${file.fileName}`;
      zip.file(filePath, arrayBuffer);
      costumeJson.file = filePath;
      libraryJson.costumes.push(costumeJson);
    }

    var soundData = getLibrarySoundData(library, libraryIndex);
    libraryJson.sounds = [];
    for (var file of soundData) {
      var soundJson = file.json;
      var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
      var filePath = `${RESOURCE_FOLDER}/lib${libraryIndex}/${RESOURCE_SOUNDS_FOLDER}/${file.fileName}`;
      zip.file(filePath, arrayBuffer);
      soundJson.file = filePath;
      libraryJson.sounds.push(soundJson);
    }

    libraryIndex += 1;
    libraryArray.push(libraryJson);
  }

  var spriteArray = [];
  var spriteIndex = 0;
  for (var sprite of engine.sprites) {
    var spriteJson = toSpriteJSON(sprite); //add the sprite properties, without the sound and costume properties.

    //Some bit of organizing the folders.
    zip.folder(`${RESOURCE_FOLDER}/${spriteIndex}`);
    zip.folder(`${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_COSTUMES_FOLDER}`);
    zip.folder(`${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_SOUNDS_FOLDER}`);

    //Manually create the costumes array.
    var costumeData = getCostumeData(sprite, spriteIndex);
    spriteJson.costumes = [];
    for (var file of costumeData) {
      var costumeJson = file.costumeJson; //get costume property data.
      if (!file.isLinked) {
        var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
        var filePath = `${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_COSTUMES_FOLDER}/${file.fileName}`;
        zip.file(filePath, arrayBuffer);
        costumeJson.file = filePath; //add file path to read later.
      }
      progress.current += 1;
      spriteJson.costumes.push(costumeJson);
    }

    //Manually create the sounds array.
    var soundData = getSoundData(sprite, spriteIndex);
    spriteJson.sounds = [];
    for (var file of soundData) {
      var soundJson = file.soundJson; //get sound property data.
      if (!file.isLinked) {
        var arrayBuffer = await dataURLToArrayBuffer(file.dataURL);
        var filePath = `${RESOURCE_FOLDER}/${spriteIndex}/${RESOURCE_SOUNDS_FOLDER}/${file.fileName}`;
        zip.file(filePath, arrayBuffer);
        soundJson.file = filePath; //add file path to read later.
      }
      spriteJson.sounds.push(soundJson);
      progress.current += 1;
    }

    spriteArray.push(spriteJson);

    spriteIndex += 1;
  }

  var engineJson = toEngineJSON();
  engineJson.sprites = spriteArray;
  engineJson.libraries = libraryArray;

  zip.file(GAME_FILE, JSON.stringify(engineJson));

  progress.finish();
  return zip;
}

async function saveProjectZipBlob(progress = new ProgressMonitor()) {
  var zip = await saveProjectZip(progress);
  var blob = await zip.generateAsync({ type: "blob" });
  progress.finish();
  return blob;
}

//Loading an entire game file.

async function loadProjectZip(zipSource, progress = new ProgressMonitor()) {
  var zip = await JSZip.loadAsync(zipSource);

  var gameFile = zip.file(GAME_FILE);
  if (!gameFile) {
    throw new Error("Game JSON file doesn't exist in zip file.");
    return;
  }
  try {
    var engineJson = JSON.parse(await gameFile.async("string"));
  } catch (e) {
    console.error("Corrupt game JSON: ", e);
    throw new Error(
      "The project game JSON data is corrupt. Check the console for errors.",
    );
    return;
  }

  //Calculate the amount of assets to be loaded.
  var max = 0;
  for (var library of engineJson.libraries) {
    var costumes = library.costumes || [];
    var sounds = library.sounds || [];
    max += costumes.length;
    max += sounds.length;
  }
  for (var sprite of engineJson.sprites) {
    max += sprite.costumes.length;
    max += sprite.sounds.length;
  }
  progress.calculatedMax(max);

  //Load everything

  engine.emptyProject(); //Start from empty project

  fromEngineJSON(engineJson);

  var librariesArray = engineJson.libraries || []; //Safety fallback in case using an older GGM3 file.

  for (var libraryJson of librariesArray) {
    var library = engine.createEmptyLibrary();

    for (var costumeJson of (libraryJson.costumes || [])) {
      var filePath = costumeJson.file;
      var mimeType = costumeJson.mimeType ? costumeJson.mimeType : "image/png";
      var dataURL = null;

      var file = zip.file(filePath); //Find the file
      if (!file) {
        throw new Error(
          `Unable to locate file path "${filePath}" in the ggm3 file.`,
        );
        return;
      }
      var arrayBuffer = await file.async("arraybuffer");
      dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);

      await loadLibraryCostume(library, costumeJson, dataURL);
      progress.current += 1;
    }

    for (var soundJson of (libraryJson.sounds || [])) {
      var filePath = soundJson.file;
      var mimeType = soundJson.mimeType ? soundJson.mimeType : "audio/wav";
      var dataURL = null;

      var file = zip.file(filePath); //Find the file
      if (!file) {
        throw new Error(
          `Unable to locate file path "${filePath}" in the ggm3 file.`,
        );
        return;
      }
      var arrayBuffer = await file.async("arraybuffer");
      dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);

      await loadLibrarySound(library, soundJson, dataURL);
      progress.current += 1;
    }

    fromLibraryJSON(library, libraryJson);
  }

  for (var spriteJson of engineJson.sprites) {
    var sprite = engine.createEmptySprite();

    //Load costumes

    for (var costumeJson of spriteJson.costumes) {
      var mimeType = costumeJson.mimeType ? costumeJson.mimeType : "image/png"; //Fallback to PNG file type if it doesn't have a mime type.
      var dataURL = null;
      if (!costumeJson.linkID) {
        var filePath = costumeJson.file;

        var file = zip.file(filePath); //Find the file
        if (!file) {
          throw new Error(
            `Unable to locate file path "${filePath}" in the ggm3 file.`,
          );
          return;
        }
        var arrayBuffer = await file.async("arraybuffer");
        dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);
      }

      await loadCostume(sprite, costumeJson, dataURL); //function will automatically look up libraries if it has an linkID.
      progress.current += 1;
    }

    //Load sounds

    for (var soundJson of spriteJson.sounds) {
      var mimeType = soundJson.mimeType ? soundJson.mimeType : "audio/mp3"; //Fallback to MP3 file type if it doesn't have a mime type.
      var dataURL = null;
      if (!soundJson.linkID) {
        var filePath = soundJson.file;

        var file = zip.file(filePath); //Find the file
        if (!file) {
          throw new Error(
            `Unable to locate file path "${filePath}" in the ggm3 file.`,
          );
          return;
        }
        var arrayBuffer = await file.async("arraybuffer");
        dataURL = await arrayBufferToDataURL(arrayBuffer, mimeType);
      }

      await loadSound(sprite, soundJson, dataURL);
      progress.current += 1;
    }

    //Add sprite properties.
    fromSpriteJSON(sprite, spriteJson);
  }

  await compileAllSprites();

  progress.finish();
}

module.exports = {
  saveProjectZip,
  saveProjectZipBlob,

  loadProjectZip,
};
