var engine = require("../curengine.js");
var {
  toSoundJSON,
  toCostumeJSON,
  toLibraryCostumeJSON,
  toLibrarySoundJSON,
} = require("./from-to.js");

//file names

function getCostumeFileName(spriteIndex, costumeIndex) {
  var fileName = "sprite_" + spriteIndex + "_costume_" + costumeIndex + ".img";
  return fileName;
}

function getSoundFileName(spriteIndex, soundIndex) {
  var fileName = "sprite_" + spriteIndex + "_sound_" + soundIndex + ".aud";
  return fileName;
}

function getLibraryCostumeFileName(libraryIndex, costumeIndex) {
  var fileName =
    "library_" + libraryIndex + "_costume_" + costumeIndex + ".img";
  return fileName;
}

function getLibrarySoundFileName(libraryIndex, soundIndex) {
  var fileName = "library_" + libraryIndex + "_sound_" + soundIndex + ".aud";
  return fileName;
}

//sprite files

function getCostumeData(sprite, spriteIndex) {
  var data = [];
  var costumeIndex = 0;
  for (var costume of sprite.costumes) {
    data.push({
      fileName: costume.linkID
        ? null
        : getCostumeFileName(spriteIndex || 0, costumeIndex),
      dataURL: costume.linkID ? null : costume.dataURL,
      isLinked: !!costume.linkID,
      costumeJson: toCostumeJSON(costume),
    });
    costumeIndex += 1;
  }

  return data;
}

function getSoundData(sprite, spriteIndex) {
  var data = [];
  var soundIndex = 0;
  for (var sound of sprite.sounds) {
    data.push({
      fileName: sound.linkID
        ? null
        : getSoundFileName(spriteIndex || 0, soundIndex),
      dataURL: sound.linkID ? null : sound.dataURL,
      isLinked: !!sound.linkID,
      soundJson: toSoundJSON(sound),
    });
    soundIndex += 1;
  }

  return data;
}

//library files

function getLibraryCostumeData(library, libraryIndex) {
  var data = [];
  var costumeIndex = 0;
  for (var costume of library.costumes) {
    data.push({
      fileName: getLibraryCostumeFileName(libraryIndex || 0, costumeIndex),
      dataURL: costume.src,
      json: toLibraryCostumeJSON(costume),
    });
    costumeIndex += 1;
  }

  return data;
}

function getLibrarySoundData(library, libraryIndex) {
  var data = [];
  var soundIndex = 0;
  for (var sound of library.sounds) {
    data.push({
      fileName: getLibrarySoundFileName(libraryIndex || 0, soundIndex),
      dataURL: sound.src,
      json: toLibrarySoundJSON(sound),
    });
    soundIndex += 1;
  }

  return data;
}

//array buffer loading for costumes and sounds.

var {
  fromCostumeJSON,
  fromSoundJSON,
  fromLibraryCostumeJSON,
  fromLibrarySoundJSON,
} = require("./from-to.js");

async function loadLibraryCostume(library, costumeJson, fileDataURL) {
  var libCostume = library.addCostume(
    fileDataURL,
    costumeJson.name,
    costumeJson.mimeType,
    costumeJson.id,
  );

  fromLibraryCostumeJSON(libCostume, costumeJson);
  return libCostume;
}

async function loadLibrarySound(library, soundJson, fileDataURL) {
  var libSound = library.addSound(
    fileDataURL,
    soundJson.name,
    soundJson.mimeType,
    soundJson.id,
  );

  fromLibrarySoundJSON(libSound, soundJson);
  return libSound;
}

async function loadCostume(sprite, costumeJson, fileDataURL) {
  if (costumeJson.linkID) {
    //Different loading behavior for costumes from libraries.
    var libCostume = engine.findLibraryCostume(costumeJson.linkID);
    if (!libCostume) {
      throw new Error(
        `Coudln't find a library costume for ID "${costumeJson.linkID}".`,
      );
    }
    if (costumeJson.willPreload) {
      var costume = await sprite.addCostume(libCostume, costumeJson.name);
    } else {
      var costume = sprite.addCostumeWithoutLoading(
        libCostume,
        costumeJson.name,
      );
    }
    fromCostumeJSON(costume, costumeJson);
    return costume;
  }

  if (costumeJson.willPreload) {
    var costume = await sprite.addCostume(fileDataURL, costumeJson.name);
  } else {
    var costume = sprite.addCostumeWithoutLoading(
      fileDataURL,
      costumeJson.name,
    );
  }
  fromCostumeJSON(costume, costumeJson);
  return costume;
}

async function loadSound(sprite, soundJson, fileDataURL) {
  if (soundJson.linkID) {
    var libSound = engine.findLibrarySound(soundJson.linkID);
    if (!libSound) {
      throw new Error(
        `Couldn't find a library sound for ID "${soundJson.linkID}".`,
      );
    }

    if (soundJson.willPreload) {
      var sound = await sprite.addSound(libSound, soundJson.name);
    } else {
      var sound = sprite.addSoundWithoutLoading(libSound, soundJson.name);
    }
    fromSoundJSON(sound, soundJson);
    return sound;
  }

  if (soundJson.willPreload) {
    var sound = await sprite.addSound(fileDataURL, soundJson.name);
  } else {
    var sound = sprite.addSoundWithoutLoading(fileDataURL, soundJson.name);
  }
  fromSoundJSON(sound, soundJson);
  return sound;
}

module.exports = {
  getCostumeFileName,
  getSoundFileName,

  getCostumeData,
  getSoundData,

  getLibraryCostumeData,
  getLibrarySoundData,

  loadCostume,
  loadSound,
  loadLibraryCostume,
  loadLibrarySound,
};
