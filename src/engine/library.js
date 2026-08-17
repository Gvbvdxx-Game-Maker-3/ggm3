var LibraryIDs = require("./libraryid.js");
var LibraryCostume = require("./librarycostume.js");
var idcount = 0;

class Library {
  constructor(engine) {
    this.engine = engine;
    this.name = "Library";
    this.id = idcount + "_" + Date.now() + "_" + Math.round(Math.random() * 9999999);
    idcount += 1;
    this.costumes = [];
    this.sounds = [];
  }

  removeCostume(costume) {
    //Unlink the costume from sprites by copying the data url to ones with the link id.
    for (var sprite of this.engine.sprites) {
      for (var sc of sprite.costumes) {
        if (sc.linkID == costume.id) {
          sc.linkID = null;
          sc.dataURL = costume.src;
        }
      }
    }
    
    //Actually dispose the costume now.
    costume.id = null;
    costume.src = null;
    this.costumes = this.costumes.filter((c) => c.id !== costume.id);
  }

  addCostume(src, name, mimeType, _id) {
    var id = _id ? _id : LibraryIDs.getUniqueID();
    var costume = new LibraryCostume(this, src, name || "Costume", mimeType || "image/png", id);
    this.costumes.push(costume);
    this.checkUniqueNames();
  }

  checkUniqueNames() {
    var names = [];
    for (var costume of this.costumes) {
      if (names.indexOf(costume.name) > -1) {
        var number = 1;
        var ogName = costume.name;
        while (names.indexOf(costume.name) > -1) {
          costume.name = ogName + " (" + number + ")";
          number += 1;
        }
        names.push(costume.name);
      } else {
        names.push(costume.name);
      }
    }

    var names = [];
    for (var sound of this.sounds) {
      if (names.indexOf(sound.name) > -1) {
        var number = 1;
        var ogName = sound.name;
        while (names.indexOf(sound.name) > -1) {
          sound.name = ogName + " (" + number + ")";
          number += 1;
        }
        names.push(sound.name);
      } else {
        names.push(sound.name);
      }
    }
  }

  dispose() {
    for (var costume of this.costumes) {
      costume.id = null;
      costume.src = null;
    }
    this.costumes = [];
  }
}

module.exports = Library;
