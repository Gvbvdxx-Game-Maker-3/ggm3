var elements = require("../gp2/elements.js");
var engine = require("./curengine.js");
var dialogs = require("./dialogs.js");

//This stuff is used from GM2 (Gvbvdxx Mod 2 - Modified TurboWarp), edited to fit GGM3.

var GGM3Type = {
  description: "GGM3 game",
  accept: {
    "application/x.ggm3.ggm3": ".ggm3",
  },
};

const showSaveFilePicker = (fileName) =>
  window.showSaveFilePicker({
    suggestedName: fileName,
    types: [GGM3Type],
    excludeAcceptAllOption: true,
  });

const showOpenFilePicker = async () => {
  const [handle] = await window.showOpenFilePicker({
    multiple: false,
    types: [GGM3Type],
  });
  return handle;
};

const available = () => !!window.showSaveFilePicker;

const createWritable = (handle) => handle.createWritable();

const closeWritable = async (writable) => {
  await writable.close();
};

const writeToWritable = async (writable, content) => {
  await writable.write(content);
};

//GGM3 Stuff:

var { addAppMenu } = require("./dropdown-menus.js");
var loadingScreenContainer = elements.getGPId("loadingScreenContainer");
var loadingScreenContent = elements.getGPId("loadingScreenContent");
var selectedSprite = require("./selectedsprite.js");
var { setCurrentLibrary } = require("./library/");
var defaultProject = require("./defaultproject.js");

var newFileMenus = [];

var projectSaver = require("./file");
const dialog = require("./dialogs.js");

var fileHandle = null;

async function newProject() {
  if (fileHandle) {
    try {
      fileHandle.close();
    } catch (e) {}
    fileHandle = null;
  }
  loadingScreenContainer.hidden = false;
  await defaultProject.loadDefaultProject();
  selectedSprite.setCurrentSprite(0, true, true);
  setCurrentLibrary(0);
  loadingScreenContainer.hidden = true;
}

function loadProjectFile(file) {
  if (!file) {
    return;
  }
  fileHandle = null; //Reset the file handle to prevent accidental overwriting of the loaded file. It will be set again to the new location the user picks when they try to save.
  loadingScreenContainer.hidden = false;
  elements.setInnerJSON(loadingScreenContent, []);
  var reader = new FileReader();
  reader.onload = async function () {
    try {
      var monitor = new projectSaver.ProgressMonitor();

      monitor.on("progress", (event) => {
        elements.setInnerJSON(loadingScreenContent, [
          createProgessBarJSON(event.current / event.max, true),
        ]);
      });

      await projectSaver.loadProjectZip(reader.result, monitor);
      selectedSprite.unmarkProjectDirty();
    } catch (e) {
      await defaultProject.loadDefaultProject();
      console.error("Project load error: ", e);
      dialogs.alert(
        "Project load error: " +
          e.message +
          "\nA default project has been loaded instead.",
      );
    }
    selectedSprite.setCurrentSprite(0, true, true);
    setCurrentLibrary(0);
    loadingScreenContainer.hidden = true;
  };
  reader.readAsArrayBuffer(file);
}

var {
  saveBackupNow,
  getFileMenuOption,
  backupDeps,
  getBackupNotice,
} = require("./autobackup.js");

backupDeps.loadProjectFile = loadProjectFile;

if (available()) {
  var menuBar = elements.getGPId("menuBar");
  elements.appendElementsFromJSON(menuBar, [
    {
      element: "div",
      style: {
        marginRight: "auto",
      },
    },
    ...(getBackupNotice ? getBackupNotice() : []),
    {
      element: "div",
      className: "menuBarItem",
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        flexWarp: "none",
      },
      gid: "editFileQuick",
    },
  ]);

  var editFileQuick = elements.getGPId("editFileQuick");
  var isSaving = false;

  const TEXT_SAVENOW = "Save now";
  const TEXT_SAVING = "Saving...";

  function changeSaveNowContent(text) {
    elements.setInnerJSON(editFileQuick, [
      {
        element: "div",
        style: {
          width: "fit-content",
          height: "fit-content",
        },
        textContent: text,
      },
    ]);
  }

  changeSaveNowContent(TEXT_SAVENOW);

  function createProgessBarJSON(decimal = 0, large = false) {
    return {
      element: "div",
      className: "loadingProgressMain",
      style: large
        ? {}
        : {
            height: "15px",
            width: "70px",
          },
      children: [
        {
          element: "div",
          className: "loadingProgressInner",
          style: {
            width: Math.round(decimal * 100) + "%",
          },
        },
      ],
    };
  }

  newFileMenus.push({
    label: "Load and edit",
    icon: "icons/import.svg",
    action: async function () {
      try {
        fileHandle = await showOpenFilePicker();
      } catch (e) {
        fileHandle = null;
      }
      if (fileHandle) {
        loadingScreenContainer.hidden = false;
        elements.setInnerJSON(loadingScreenContent, [
          {
            element: "span",
            textContent: "Reading file...",
          },
        ]);
        var file = await fileHandle.getFile();
        loadProjectFile(file);
      }
    },
  });

  editFileQuick.onclick = async function () {
    if (isSaving) {
      return;
    }
    if (!fileHandle) {
      try {
        fileHandle = await showSaveFilePicker("game.ggm3");
      } catch (e) {
        fileHandle = null;
        dialogs.alert("Unable to save: " + e);
        return;
      }
    }
    changeSaveNowContent(TEXT_SAVING);
    isSaving = true;
    if (saveBackupNow) {
      saveBackupNow();
    }
    try {
      var writable = await createWritable(fileHandle);
      var monitor = new projectSaver.ProgressMonitor();
      monitor.on("progress", (event) => {
        editFileQuick.textContent = "";
        elements.setInnerJSON(editFileQuick, [
          {
            element: "div",
            textContent: TEXT_SAVING,
            style: {
              width: "fit-content",
              height: "5px",
            },
          },
          {
            element: "br",
          },
          createProgessBarJSON(event.current / event.max),
        ]);
      });
      monitor.on("finish", () => {
        editFileQuick.textContent = "";
        changeSaveNowContent(TEXT_SAVING);
      });
      var zipBlob = await projectSaver.saveProjectZipBlob(monitor);
      await writeToWritable(writable, zipBlob);
      closeWritable(writable);
      selectedSprite.unmarkProjectDirty();
    } catch (e) {
      console.error(e);
      dialogs.alert("Project save error " + e);
    }
    changeSaveNowContent(TEXT_SAVENOW);
    isSaving = false;
  };
}

var { showExportDialog } = require("./export");

addAppMenu(
  "file",
  [
    {
      element: "img",
      src: "icons/file.svg",
    },
    {
      element: "span",
      textContent: "File",
    },
  ],
  newFileMenus.concat([
    {
      label: "New",
      icon: "icons/add.svg",
      action: async function () {
        if (!(await dialogs.confirm("Start a new project?"))) {
          return;
        }
        newProject();
      },
    },
    {
      label: "Save as",
      icon: "icons/export.svg",
      action: async function () {
        var zipBlob = await projectSaver.saveProjectZipBlob();
        var objectURL = URL.createObjectURL(zipBlob);
        var a = document.createElement("a");
        a.href = objectURL;
        a.download = "project.ggm3";
        a.click();
      },
    },
    {
      label: "Load",
      icon: "icons/import.svg",
      action: async function () {
        if (selectedSprite.isProjectDirty()) {
          if (
            !(await dialogs.confirm(
              "You might have unsaved changes. Load anyway?",
            ))
          ) {
            return;
          }
        }

        var input = document.createElement("input");
        input.type = "file";
        input.accept = ".ggm3";
        input.click();

        input.addEventListener("change", function () {
          if (!input.files[0]) {
            return;
          }
          loadProjectFile(input.files[0]);
        });
      },
    },
    ...(getFileMenuOption ? getFileMenuOption() : []),

    {
      label: "Export game",
      icon: "icons/export.svg",
      action: async function () {
        showExportDialog();
      },
    },
  ]),
);

newProject();

selectedSprite.deps.exportSprite = async function (sprite) {
  var blob = await projectSaver.saveSpriteZipAsBlob(sprite);
  var objectURL = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = objectURL;
  a.download = sprite.name + ".ggm3sprite";
  a.click();
};

selectedSprite.deps.importSprite = async function (arrayBuffer) {
  loadingScreenContainer.hidden = false;
  loadingScreenContent.innerHTML = "";

  var monitor = new projectSaver.ProgressMonitor();

  monitor.on("progress", (event) => {
    elements.setInnerJSON(loadingScreenContent, [
      createProgessBarJSON(event.current / event.max, true),
    ]);
  });

  await projectSaver.loadSpriteFromZip(arrayBuffer, monitor);

  loadingScreenContainer.hidden = true;
  selectedSprite.updateSpritesContainer();
};


module.exports = {
  loadProjectFile,
};
