
var {commentsToJSON, JSONToComment} = require("./comments.js");
var {blocksToJSON, JSONToBlock} = require("./blocks.js");
var {variablesToJSON, JSONToVariables} = require("./variables.js");

function workspaceToJSON(workspace) {
    var commentsJSON = commentsToJSON(workspace);
    var blocks = blocksToJSON(workspace);
    return {
        comments: commentsJSON,
        blocks: blocks,
        variables: variablesToJSON(workspace.getAllVariables())
    };
}

function JSONToWorkspace(json, workspace) {
    var width = 0; // Not used in LTR.
    if (workspace.RTL) {
        width = workspace.getWidth();
    }
    var newBlockIds = [];
    var existingGroup = Blockly.Events.getGroup();
    if (!existingGroup) {
        Blockly.Events.setGroup(true);
    }
    if (workspace.setResizesEnabled) {
        workspace.setResizesEnabled(false);
    }


    JSONToVariables(json.variables, workspace);

    for (var blockJSON of json.blocks) {
        var block = JSONToBlock(blockJSON, workspace);
        newBlockIds.push(block.id);
        var blockX = +blockJSON.x;
        var blockY = +blockJSON.y;

        if (!isNaN(blockX) && !isNaN(blockY)) {
            block.moveBy(workspace.RTL ? width - blockX : blockX, blockY);
            if (block.comment && typeof block.comment === 'object') {
                var commentXY = block.comment.getXY();
                var commentWidth = block.comment.getBubbleSize().width;
                block.comment.moveTo(block.workspace.RTL ? width - commentXY.x - commentWidth : commentXY.x, commentXY.y);
            }
        }
    }

    for (var commentJson of json.comments) {
        JSONToComment(commentJson, workspace);
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
