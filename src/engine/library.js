var LibraryCostume = require("./librarycostume.js");

class Library {
  constructor(engine) {
    this.engine = engine;
    this.name = "Library";
    this.id = Date.now() + "_" + Math.round(Math.random() * 9999999);
    this.costumes = [];
    this.sounds = [];
  }

  dispose() {}
}

module.exports = Library;
