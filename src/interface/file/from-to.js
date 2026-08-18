var {
  getSaveableVariables,
  getSaveableVariablesGlobal,
} = require("./saveable-vars.js");
var engine = require("../curengine.js");

//Engine property names

function _fromEnginePropertyNames(from) {
  engine.propertyVariables = {};
  for (var name of from || []) {
    engine.propertyVariables[name] = true;
  }
}

function _toEnginePropertyNames(from) {
  return Object.keys(engine.propertyVariables);
}

//Engine properties

function fromEngineJSON(mainJSON) {
  Object.assign(engine, {
    globalVariables: mainJSON.globalVariables || {},
    broadcastNames: mainJSON.broadcastNames || [],
    frameRate: mainJSON.frameRate || 60,
    gameWidth: mainJSON.gameWidth || engine.DEFAULT_WIDTH,
    gameHeight: mainJSON.gameHeight || engine.DEFAULT_HEIGHT,
  });
  _fromEnginePropertyNames(mainJSON.spriteProperties);
  engine.updateCanvasSize();
}

function toEngineJSON() {
  return {
    globalVariables: getSaveableVariablesGlobal(engine.globalVariables),
    broadcastNames: engine.broadcastNames,
    frameRate: engine.frameRate,
    spriteProperties: _toEnginePropertyNames(),
    gameWidth: engine.gameWidth,
    gameHeight: engine.gameHeight,
  };
}

/** Export safe version of `toEngineJSON` */
function toEngineExportJSON() {
  return {
    globalVariables: getSaveableVariablesGlobal(engine.globalVariables),
    broadcastNames: engine.broadcastNames,
    frameRate: engine.frameRate,
    spriteProperties: _toEnginePropertyNames(),
    gameWidth: engine.gameWidth,
    gameHeight: engine.gameHeight,
  };
}

//Sprite properties

function fromSpriteJSON(sprite, spriteJson, isImport) {
  Object.assign(sprite, {
    x: spriteJson.x,
    y: spriteJson.y,
    angle: spriteJson.angle,
    scaleX: spriteJson.scaleX,
    scaleY: spriteJson.scaleY,
    skewX: spriteJson.skewX || 0,
    skewY: spriteJson.skewY || 0,
    size: spriteJson.size,
    blocklyXML: spriteJson.blocklyXML
      ? Blockly.Xml.textToDom(spriteJson.blocklyXML)
      : null,
    name: spriteJson.name,
    costumeIndex: spriteJson.costumeIndex,
    zIndex: spriteJson.zIndex,
    variables: spriteJson.variables,
    hidden: spriteJson.hidden,
    spriteProperties: spriteJson.properties || {},
  });

  if (!isImport) {
    return; //Stop here if not importing a sprite from a sprite file.
  }

  //Add things to the engine if they don't exist yet.
  for (var propertyName of Object.keys(sprite.spriteProperties)) {
    engine.propertyVariables[propertyName] = true;
  }

  if (spriteJson.broadcastNames) {
    for (var name of spriteJson.broadcastNames) {
      if (engine.broadcastNames.indexOf(name) == -1) {
        engine.broadcastNames.push(name);
      }
    }
  }
}

function toSpriteJSON(sprite, isExport) {
  var spriteJson = {
    x: sprite.x,
    y: sprite.y,
    angle: sprite.angle,
    scaleX: sprite.scaleX,
    scaleY: sprite.scaleY,
    skewX: sprite.skewX,
    skewY: sprite.skewY,
    size: sprite.size,
    blocklyXML: sprite.blocklyXML
      ? Blockly.Xml.domToText(sprite.blocklyXML)
      : null,
    name: sprite.name,
    zIndex: sprite.zIndex,
    costumeIndex: sprite.costumeIndex,
    variables: getSaveableVariables(sprite.variables),
    properties: getSaveableVariablesGlobal(sprite.spriteProperties),
    hidden: sprite.hidden,
  };

  if (!isExport) {
    return spriteJson; //Return normal ggm3 game file sprite.
  }

  //Return additional properties for importing from sprites.
  spriteJson.broadcastNames = engine.broadcastNames;

  return spriteJson; //return with additional properties.
}
function toExportableSpriteJSON(sprite) {
  return {
    x: sprite.x,
    y: sprite.y,
    angle: sprite.angle,
    scaleX: sprite.scaleX,
    scaleY: sprite.scaleY,
    skewX: sprite.skewX,
    skewY: sprite.skewY,
    size: sprite.size,
    //Exclude blocklyXML since it isn't needed to make the game work.
    //blocklyXML: sprite.blocklyXML
    //  ? Blockly.Xml.domToText(sprite.blocklyXML)
    //  : null,
    name: sprite.name,
    zIndex: sprite.zIndex,
    costumeIndex: sprite.costumeIndex,
    variables: getSaveableVariables(sprite.variables),
    properties: getSaveableVariablesGlobal(sprite.spriteProperties),
    hidden: sprite.hidden,
  };
}

//Costume properties

function fromCostumeJSON(costume, costumeJson) {
  Object.assign(costume, {
    id: costumeJson.id,
    rotationCenterX: costumeJson.rotationCenterX,
    rotationCenterY: costumeJson.rotationCenterY,
    preferedScale: costumeJson.preferedScale,
    willPreload: costumeJson.willPreload,
    mimeType: costumeJson.mimeType,
    linkID: costumeJson.linkID,
  });
}

function toCostumeJSON(costume) {
  return {
    name: costume.name,
    id: costume.id,
    rotationCenterX: costume.rotationCenterX,
    rotationCenterY: costume.rotationCenterY,
    preferedScale: costume.preferedScale,
    willPreload: costume.willPreload,
    mimeType: costume.mimeType,
    linkID: costume.linkID,
  };
}

function toExportableCostumeJSON(costume) {
  return {
    name: costume.name,
    id: costume.id,
    rotationCenterX: costume.rotationCenterX,
    rotationCenterY: costume.rotationCenterY,
    preferedScale: costume.preferedScale,
    willPreload: costume.willPreload,
    mimeType: costume.mimeType,
  };
}

//Sound properties

function fromSoundJSON(sound, soundJson) {
  Object.assign(sound, {
    id: soundJson.id,
    willPreload: soundJson.willPreload,
    mimeType: soundJson.mimeType,
    linkID: soundJson.linkID,
  });
}

function toSoundJSON(sound) {
  return {
    name: sound.name,
    id: sound.id,
    willPreload: sound.willPreload,
    mimeType: sound.mimeType,
    linkID: sound.linkID,
  };
}

function toExportableSoundJSON(sound) {
  return {
    name: sound.name,
    id: sound.id,
    willPreload: sound.willPreload,
    mimeType: sound.mimeType,
  };
}

//Libraries

function toLibraryJSON(library) {
  return {
    name: library.name,
    id: library.id,
  };
}

function fromLibraryJSON(library, libraryJson) {
  Object.assign(library, {
    name: "" + libraryJson.name,
    id: libraryJson.id,
  });
}

//Library costumes

function toLibraryCostumeJSON(libCostume) {
  return {
    name: libCostume.name,
    id: libCostume.id,
    mimeType: libCostume.mimeType,
  };
}

function fromLibraryCostumeJSON(libCostume, libCostumeJson) {
  Object.assign(libCostume, {
    name: "" + libCostumeJson.name,
    id: libCostumeJson.id,
    mimeType: libCostumeJson.mimeType,
  });
}

//Library sounds

function toLibrarySoundJSON(libSound) {
  return {
    name: libSound.name,
    id: libSound.id,
  };
}

function fromLibrarySoundJSON(libSound, libSoundJson) {
  Object.assign(libSound, {
    name: "" + libSoundJson.name,
    id: libSoundJson.id,
  });
}

module.exports = {
  fromEngineJSON,
  toEngineJSON,

  toEngineExportJSON,

  fromSpriteJSON,
  toSpriteJSON,
  toExportableSpriteJSON,

  fromCostumeJSON,
  toCostumeJSON,
  toExportableCostumeJSON,

  fromSoundJSON,
  toSoundJSON,
  toExportableSoundJSON,

  toLibraryJSON,
  fromLibraryJSON,

  toLibraryCostumeJSON,
  fromLibraryCostumeJSON,

  toLibrarySoundJSON,
  fromLibrarySoundJSON,
};
