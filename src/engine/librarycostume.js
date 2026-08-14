class LibraryCostume {
  constructor(library, src) {
    this.library = library;
    this.engine = library.engine;
    this.src = src;
    this.id = Date.now() + "_" + Math.round(Math.random() * 9999999);
  }
}

module.exports = LibraryCostume;
