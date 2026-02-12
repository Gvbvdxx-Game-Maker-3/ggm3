var uiModule = require("./selectedsprite/ui.js");
var compileModule = require("./selectedsprite/compile.js");
var workspaceModule = require("./selectedsprite/workspace.js");

var engine = require("./curengine.js");
var blocks = require("./blocks.js");
var costumeViewer = require("./costumeviewer.js");
var soundViewer = require("./soundviewer.js");
var compiler = require("../compiler");
var blockMenu = require("./blockmenuloader.js");
var { valueReport } = require("./value-report.js");
var { makeSortable } = require("./drag-utils.js");
var { loadBlockMenus } = blockMenu;

// shared mutable state object passed to submodules
var state = {
  currentSelectedSprite: null,
  currentSelectedSpriteIndex: null,
};

var deps = {
  engine,
  blocks,
  costumeViewer,
  soundViewer,
  compiler,
  blockMenu,
  valueReport,
  makeSortable,
  loadBlockMenus,
  // these will be filled after init
  ui: null,
  compile: null,
  workspace: null,
  onSetCurrentSprite: null,
};

var ui = uiModule.init(state, deps);
var compile = compileModule.init(state, deps);
// provide compile and ui references into deps for cross-use
deps.compile = compile;
deps.ui = ui;
var workspace = workspaceModule.init(state, deps);
deps.workspace = workspace;

// expose a setCurrentSprite function that coordinates state + ui + workspace
function setCurrentSprite(index, forced, dontSave) {
  if (!forced) {
    if (state.currentSelectedSpriteIndex == index) return;
  }
  if (state.currentSelectedSprite) {
    state.currentSelectedSprite.onErrorLog = function () {};
    state.currentSelectedSprite.threadStartListener = null;
    state.currentSelectedSprite.threadEndListener = null;
    if (workspace) {
      workspace.saveScroll();
      if (!dontSave) {
        state.currentSelectedSprite.blocklyXML = Blockly.Xml.workspaceToDom(
          blocks.getCurrentWorkspace(),
        );
      }
    }
  }
  state.currentSelectedSpriteIndex = index;
  state.currentSelectedSprite = engine.sprites[index];

  // update inputs/UI
  deps.ui.updateSpritesContainer();
  workspace.loadCode(state.currentSelectedSprite);
  workspace.handleSpriteErrorLog(state.currentSelectedSprite);
  // reload assets
  costumeViewer.reloadCostumes(state.currentSelectedSprite, loadCostumes);
  soundViewer.reloadSounds(state.currentSelectedSprite, loadSounds);
}

function loadCostumes() {
  costumeViewer.reloadCostumes(state.currentSelectedSprite, loadCostumes);
}
function loadSounds() {
  soundViewer.reloadSounds(state.currentSelectedSprite, loadSounds);
}

function getCurSprite() {
  return state.currentSelectedSprite;
}
function getCurSpriteIndex() {
  return state.currentSelectedSpriteIndex;
}

function saveCurrentSpriteCode() {
  if (state.currentSelectedSprite) {
    workspace.saveCurrentSpriteCode();
  }
}

// wire callback for UI actions (add/select/delete/duplicate)
deps.onSetCurrentSprite = function (idx, forced, dontSave) {
  return setCurrentSprite(idx, forced, dontSave);
};

// expose compile helpers onto blockMenu as before
if (blockMenu && blockMenu.helpers) {
  blockMenu.helpers.loadWorkspaceFromSprite = compile.loadWorkspaceFromSprite;
}

module.exports = {
  setCurrentSprite,
  updateSpritesContainer: ui.updateSpritesContainer,
  getCurSprite,
  getCurSpriteIndex,
  loadCode: workspace.loadCode,
  compileSpriteXML: compile.compileSpriteXML,
  compileAllSprites: compile.compileAllSprites,
  saveCurrentSpriteCode,
  saveScroll: workspace.saveScroll,
  scrollToPrevious: workspace.scrollToPrevious,
  deps: deps,
};
