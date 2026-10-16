
var {commentsToJSON} = require("./comments.js");
var {blocksToJSON, JSONToBlock} = require("./blocks.js");

function workspaceToJSON(workspace) {
    var commentsJSON = commentsToJSON(workspace);
    var blocks = blocksToJSON(workspace);
    return {
        comments: commentsJSON,
        blocks: blocks
    };
}

function JSONToWorkspace(json, workspace) {
    var width = 0; // Not used in LTR.
    if (workspace.RTL) {
        width = workspace.getWidth();
    }
    var newBlockIds = [];
    var childCount = xml.childNodes.length;
    var existingGroup = Blockly.Events.getGroup();
    if (!existingGroup) {
        Blockly.Events.setGroup(true);
    }
    if (workspace.setResizesEnabled) {
        workspace.setResizesEnabled(false);
    }
    var variablesFirst = true;

    for (var blockJSON of json.blocks) {
        var block = JSONToBlock(blockJSON, workspace);
        newBlockIds.push(block.id);
        var blockX = +blockJSON.x;
        var blockY = +blockJSON.y;
    }

    if (workspace.setResizesEnabled) {
        workspace.setResizesEnabled(true);
    }
    return newBlockIds;
}

module.exports = {
    workspaceToJSON,
    commentsToJSON,
    blocksToJSON,
    JSONToWorkspace
};
