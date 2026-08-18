class LibrarySound {
  constructor(library, src, name, mimeType, id) {
    this.library = library;
    this.engine = library.engine;
    this.src = src;
    this.id = id;
    this.name = name;
    this.mimeType = mimeType;
  }
}

module.exports = LibrarySound;
