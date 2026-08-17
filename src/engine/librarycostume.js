class LibraryCostume {
  constructor(library, src, name, id) {
    this.library = library;
    this.engine = library.engine;
    this.src = src;
    this.id = id;
    this.name = name;
  }
}

module.exports = LibraryCostume;
