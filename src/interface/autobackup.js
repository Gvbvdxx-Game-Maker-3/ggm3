var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");
var engine = require("./curengine.js");
var { saveBackup, getBackups, getBackupData, deleteBackup } = require('./autobackup-db.js');
var isSupported = !!(window.indexedDB && window.showSaveFilePicker && window.showOpenFilePicker);
var BACKUP_INTERVAL = 5 * 60 * 1000; // 5 minutes
var projectSaver = require("./file");
var selectedSprite = require("./selectedsprite.js");
var dialogs = require("./dialogs.js");

var backupDeps = {
    loadProjectFile: () => {},
};

function getThumbnail() {
    var canvas = engine.canvas;
    return new Promise((resolve) => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, "image/png");
    });
}

//for testing
//BACKUP_INTERVAL = 30 * 1000; // 30 seconds

var loadingScreenContainer = elements.getGPId("loadingScreenContainer");
var loadingScreenContent = elements.getGPId("loadingScreenContent");
var isBackingUp = false;
async function saveBackupNow() {
    if (!isSupported) {
        return;
    }
    if (isBackingUp) {
        return;
    }
    if (!selectedSprite.isProjectDirty()) {
        return;
    }
    if (!loadingScreenContainer.hidden) {
        return; // Loading so don't accidentally store a backup of a half-loaded project.
    }

    var backupNotice = elements.getGPId("backingUpNotice");
    if (backupNotice) {
        backupNotice.hidden = false;
    }

    isBackingUp = true;
    var thumbBlob = await getThumbnail();
    var zipBlob = await projectSaver.saveProjectZipBlob();
    await saveBackup(zipBlob, thumbBlob)
    isBackingUp = false;

    if (backupNotice) {
        backupNotice.hidden = true;
    }
}

var backupInterval = setInterval(saveBackupNow, BACKUP_INTERVAL);

var backupDialog = elements.createElementsFromJSON([
  {
    element: "div",
    hidden: true,
    children: [
      {
        element: "div",
        className: "dialogBackground",
      },

      {
        element: "div",
        className: "gameBackupBox centerMiddle",
        children: [
          {
            element: "h2",
            textContent: "Backup history",
            style: {
              textAlign: "center",
              flexShrink: "0px",
            },
          },
          {
            element: "span",
            children: [
                {element:"b",textContent:"Don't rely on these backups to save your work! "},
                { element: "br" },
                "They can be deleted at any time or by your browser without warning. ",
                "This is meant as a last resort to recover from crashes or other unexpected issues. ",
                "Always make sure to save your project regularly. ",
                { element: "br" },
                "This can only hold a few backups, so older ones will be deleted as new ones are made. ",
                "If you want to keep a backup, make sure to download it before making more changes or it might be deleted."
            ]
          },
          {
            element: "div",
            className: "gameBackupSelection",
            children: [
              {
                element: "button",
                className: "greyButtonStyle",
                textContent: "Close",
                style: {
                  width: "100%",
                  boxSizing: "border-box",
                  textAlign: "center",
                },
                onclick: () => {
                  backupDialog.hidden = true;
                },
              },
            ],
          },
          {
            element: "div",
            className: "gameBackupCategory",
            children: [
                {
                    element: "div",
                    gid: "backupListContainer"
                }
            ],
          },
        ],
      },
    ],
  },
])[0];

backupDialog.hidden = true;
document.body.append(backupDialog);

var backupListContainer = elements.getGPId("backupListContainer");
var blobImages = [];

async function refreshBackupList() {
    backupListContainer.textContent = "Loading...";

    var backups = await getBackups();
    backupListContainer.textContent = "";
    elements.removeAllChildren(backupListContainer);

    blobImages.forEach(URL.revokeObjectURL);
    blobImages = [];

    backups.forEach((backup) => {

        function loadBackupButtonClicked() {
            var promise = Promise.resolve(true);
            if (selectedSprite.isProjectDirty()) {
                promise = dialogs.confirm("You have unsaved changes. Are you sure you want to load this backup and lose those changes?");
            }
            promise.then((confirmed) => {
                if (confirmed) {
                    loadingScreenContainer.hidden = false;
                    backupDialog.hidden = true;
                    loadingScreenContent.textContent = "Reading backup content...";
                    getBackupData(backup.id).then((zipBlob) => {
                        loadingScreenContent.textContent = "";
                        backupDeps.loadProjectFile(zipBlob);
                    });
                }
            });
        }

        function downloadBackupButtonClicked() {
            getBackupData(backup.id).then((zipBlob) => {
                var url = URL.createObjectURL(zipBlob);
                var a = document.createElement("a");
                a.href = url;
                a.download = `Gvbvdxx Game Maker 3 backup from ${new Date(backup.timestamp).toISOString()}.ggm3`;
                document.body.append(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            });
        }

        function deleteBackupButtonClicked() {
            var promise = dialogs.confirm("Are you sure you want to delete this backup?");
            promise.then((confirmed) => {
                if (confirmed) {
                    deleteBackup(backup.id);
                    refreshBackupList();
                }
            });
        }

        var blobUrl = URL.createObjectURL(backup.thumbnail);
        blobImages.push(blobUrl);
        var backupElement = elements.createElementsFromJSON([
            {
                element: "div",
                className: "backupEntry",
                children: [
                    {
                        element: "img",
                        className: "backupThumbnail",
                        src: blobUrl
                    },
                    {
                        element: "span",
                        textContent: new Date(backup.timestamp).toLocaleString(),
                        className: "backupTimestamp"
                    },
                    {
                        element: "div",
                        style: {
                            marginLeft: "auto",
                        }
                    },
                    {
                        element: "button",
                        className: "greyButtonStyle",
                        children: [
                            "Load"
                        ],
                        eventListeners: [
                            {
                                event: "click",
                                func: loadBackupButtonClicked
                            }
                        ]
                    },
                    {
                        element: "button",
                        className: "greyButtonStyle",
                        children: [
                            "Download"
                        ],
                        eventListeners: [
                            {
                                event: "click",
                                func: downloadBackupButtonClicked
                            }
                        ]
                    },
                    {
                        element: "button",
                        className: "greyButtonStyle",
                        textContent: "Delete",
                        eventListeners: [
                            {
                                event: "click",
                                func: deleteBackupButtonClicked
                            }
                        ]
                    }
                ]
            },
        ])[0];
        backupListContainer.append(backupElement);
    });
}

function getFileMenuOption () {
    if (!isSupported) {
        return [];
    }
    return [
        {
            label: "Backup history",
            icon: "icons/history.svg",
            action: function () {
                backupDialog.hidden = false;
                refreshBackupList();
            }
        }
    ];
}

function getBackupNotice() {
    if (!isSupported) {
        return [];
    }
    return [
        {
            element: "div",
            className: "unclickableMenuBarItem backupNoticeMenuBarItem",
            gid: "backingUpNotice",
            hidden: true,
            children: [
                {
                    element: "img",
                    src: "icons/history.svg",
                    style: {
                        width: "16px",
                        height: "16px",
                        objectFit: "contain"
                    }
                },
                {
                    element: "span",
                    textContent: "Saving to backup point..."
                }
            ]
        }
    ];
}

module.exports = {
  saveBackupNow,
  getFileMenuOption,
  backupDeps,
  getBackupNotice
};