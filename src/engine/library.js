var LibraryCostume = require("./librarycostume.js");

class Library {
  constructor(engine) {
    this.engine = engine;
    this.id = this.name = "Library";
    this.costumes = [];
    this.sounds = [];
  }
}

module.exports = Library;
