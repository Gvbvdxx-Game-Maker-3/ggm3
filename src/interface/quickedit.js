var elements = require("../gp2/elements.js");
var engine = require("./curengine.js");
var dialogs = require("./dialogs.js");

//This stuff is used from GM2 (Gvbvdxx Mod 2 - Modified TurboWarp), edited to fit GGM3.

var GGM3Type = {
    description: 'GGM3 game',
    accept: {
        'application/x.ggm3.ggm3': '.ggm3'
    }
};

const showSaveFilePicker = fileName => window.showSaveFilePicker({
    suggestedName: fileName,
    types: [
		GGM3Type
    ],
    excludeAcceptAllOption: true
});

const showOpenFilePicker = async () => {
    const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [
			GGM3Type
        ]
    });
    return handle;
};

const available = () => !!window.showSaveFilePicker;

const createWritable = handle => handle.createWritable();

const closeWritable = async writable => {
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
var defaultProject = require("./defaultproject.js");

var newFileMenus = [];

var projectSaver = require("./projectzip.js");

async function newProject() {
  loadingScreenContainer.hidden = false;
  await defaultProject.loadDefaultProject();
  selectedSprite.setCurrentSprite(0, true, true);
  loadingScreenContainer.hidden = true;
}

if (available()) {
    var menuBar = elements.getGPId("menuBar");
    elements.appendElementsFromJSON(menuBar,[
        {
            element: "div",
            style: {
                marginRight: "auto"
            }
        },
        {
            element: "div",
            className: "menuBarItem",
            gid: "editFileQuick",
        },
    ]);

    var editFileQuick = elements.getGPId("editFileQuick");
    var fileHandle = null;
    var isSaving = false;

    editFileQuick.textContent = "Save now";

    async function loadFile() {
        
    }

    newFileMenus.push({
      label: "Load and edit",
      icon: "icons/import.svg",
      action: async function () {
        try{
            fileHandle = await showOpenFilePicker("game.ggm3");
        }catch(e){
            fileHandle = null;
        }
      },
    });

    editFileQuick.onclick = async function () {
        if (isSaving) {
            return;
        }
        var previousTextContent = editFileQuick.textContent;
        if (fileHandle) {
            editFileQuick.textContent = "Saving...";
            isSaving = true;
            try{
                var writable = await createWritable(fileHandle);
                var zip = await projectSaver.saveProjectToZip();
                var objectURL = await zip.generateAsync({ type: "blob" });
                await writeToWritable(writable, objectURL);
            }catch(e){
                console.error(e);
                dialogs.alert("Project save error "+e);
            }
            editFileQuick.textContent = previousTextContent;
            isSaving = false;
        }
    };
}

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
      label: "Save",
      icon: "icons/export.svg",
      action: async function () {
        var zip = await projectSaver.saveProjectToZip();
        var objectURL = URL.createObjectURL(
          await zip.generateAsync({ type: "blob" }),
        );
        var a = document.createElement("a");
        a.href = objectURL;
        a.download = "project.ggm3";
        a.click();
      },
    },
    {
      label: "Load",
      icon: "icons/import.svg",
      action: function () {
        var input = document.createElement("input");
        input.type = "file";
        input.accept = ".ggm3";
        input.click();

        input.addEventListener("change", function () {
          if (!input.files[0]) {
            return;
          }
          loadingScreenContainer.hidden = false;
          elements.setInnerJSON(loadingScreenContent, []);
          var reader = new FileReader();
          reader.onload = async function () {
            try {
              await projectSaver.loadProjectFromZip(reader.result, (json) => {
                elements.setInnerJSON(loadingScreenContent, json);
              });
            } catch (e) {
              await defaultProject.loadDefaultProject();
              console.error("Project load error: ", e);
              dialogs.alert("Project load error: " + e.message);
            }
            selectedSprite.setCurrentSprite(0, true, true);
            loadingScreenContainer.hidden = true;
          };
          reader.readAsArrayBuffer(input.files[0]);
        });
      },
    },
  ]),
);

newProject();
