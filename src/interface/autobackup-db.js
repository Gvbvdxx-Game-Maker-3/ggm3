var idb = require("idb");

var dbPromise = idb.openDB("ggm3-autobackup", 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("metadata")) {
      db.createObjectStore("metadata", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("files")) {
      db.createObjectStore("files", { keyPath: "id" });
    }
  },
});

async function saveBackup(gameBlob, thumbBlob) {
  var db = await dbPromise;
  var id = "backup-" + Date.now();
  var MAX_VERSIONS = 10;

  var keys = await db.getAllKeys("metadata");

  var tx = db.transaction(["metadata", "files"], "readwrite");

  if (keys.length >= MAX_VERSIONS) {
    var numberToRemove = keys.length - MAX_VERSIONS + 1;
    var keysToRemove = keys.slice(0, numberToRemove);

    for (var oldId of keysToRemove) {
      tx.objectStore("metadata").delete(oldId);
      tx.objectStore("files").delete(oldId);
    }
  }

  tx.objectStore("metadata").put({
    id: id,
    thumbnail: thumbBlob,
    timestamp: Date.now(),
  });

  tx.objectStore("files").put({
    id: id,
    data: gameBlob,
  });

  await tx.done;
}

async function getBackups() {
  var db = await dbPromise;
  // getAll is fine for metadata since it's small (thumbnails + IDs)
  var metadata = await db.getAll("metadata");
  // Sort descending: Newest first
  return metadata.sort((a, b) => b.timestamp - a.timestamp);
}

async function getBackupData(id) {
  var db = await dbPromise;
  var fileEntry = await db.get("files", id);
  return fileEntry ? fileEntry.data : null;
}

async function deleteBackup(id) {
  var db = await dbPromise;
  var tx = db.transaction(["metadata", "files"], "readwrite");
  tx.objectStore("metadata").delete(id);
  tx.objectStore("files").delete(id);
  await tx.done;
}

module.exports = {
  saveBackup,
  getBackups,
  getBackupData,
  deleteBackup,
};
