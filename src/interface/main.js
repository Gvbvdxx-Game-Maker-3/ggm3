var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");
var dialogs = require("./dialogs.js");
require("./ggm3blocks");
require("./dom/index.js");
//var { createFreshWorkspace, getCurrentWorkspace } = require("./blocks.js");

var engine = require("./curengine.js");

engine.turnOnEditing();

var tabs = require("./tabs.js");
var selectedSprite = require("./selectedsprite.js");
var defaultProject = require("./defaultproject.js");

require("./enginecontrol.js");

(async function () {
  await defaultProject.loadDefaultProject();
  selectedSprite.setCurrentSprite(0);
})();

var newProjectButton = elements.getGPId("newProjectButton");
newProjectButton.addEventListener("click", async function () {
  if (!(await dialogs.confirm("Start a new project?"))) {
    return;
  }
  await defaultProject.loadDefaultProject();
  selectedSprite.setCurrentSprite(0);
});

var saveProjectButton = elements.getGPId("saveProjectButton");
var loadProjectButton = elements.getGPId("loadProjectButton");

saveProjectButton.addEventListener("click", async function () {

});

loadProjectButton.addEventListener("click", async function () {

});