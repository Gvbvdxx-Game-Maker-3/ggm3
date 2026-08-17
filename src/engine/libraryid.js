var count = 0;

class LibraryIDs {
  static getUniqueID() {
    var genId =
      "LIB_" +
      Date.now() +
      "_" +
      Math.round(Math.random() * 9999999) +
      "_" +
      Math.round(Math.random() * 9999999) +
      "_" +
      count;
    count += 1;
    return genId;
  }
}

module.exports = LibraryIDs;
