var LibraryIDs = require("./libraryid.js");
var LibraryCostume = require("./librarycostume.js");

class Library {
  constructor(engine) {
    this.engine = engine;
    this.name = "Library";
    this.id = Date.now() + "_" + Math.round(Math.random() * 9999999);
    this.costumes = [];
    this.sounds = [];
  }

  removeCostume(costume) {
    costume.id = null;
    costume.src = null;
    this.costumes = this.costumes.filter((c) => c.id !== costume.id);
  }

  addCostume(src, _id) {
    var id = _id ? _id : LibraryIDs.getUniqueID();
    var costume = new LibraryCostume(this, src, id);
    this.costumes.push(costume);
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
