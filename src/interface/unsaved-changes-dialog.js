var selectedSprite = require("./selectedsprite");
var dialogs = require("./dialogs.js");
addEventListener("beforeunload", (event) => {
    if (selectedSprite.isProjectDirty()) {
        event.preventDefault();
        return false;
    }
});
