
var { mutationToJSON } = require("./mutation.js");
var { fieldsToJSON } = require("./fields.js");
var { blockCommentToJSON } = require("./comments.js");

function blockToJSON(block) {
    var json = {};

    if (block.isShadow()) {
        json.shadow = true;
    }

    json.type = block.type;
    json.id = block.id;

    json.comment = blockCommentToJSON(block);

    if (block.mutationToDom) {
        var mutation = block.mutationToDom();
        if (mutation) {
            json.mutation = mutationToJSON(mutation);
        }
    }

    if (block.data) {
        json.data = block.data;
    }

    json.fields = fieldsToJSON(block);

    json.inputs = [];
    for (var input of block.inputList) {
        var inputJSON = {};
        if (input.type !== Blockly.DUMMY_INPUT) {
            var childBlock = input.connection.targetBlock();
            inputJSON.name = input.name;
            if (input.type == Blockly.INPUT_VALUE) {
                inputJSON.type = "value";
            } else if (input.type == Blockly.NEXT_STATEMENT) {
                inputJSON.type = "statement";
            }
            if (childBlock) {
                inputJSON.block = blockToJSON(childBlock);
            }
            json.inputs.push(inputJSON);
        }
    }

    if (block.inputsInlineDefault != block.inputsInline) {
        json.inline = block.inputsInline;
    }
    if (block.isCollapsed()) {
        json.collapsed = true;
    }
    if (block.disabled) {
        json.disabled = true;
    }
    if (!block.isDeletable() && !block.isShadow()) {
        json.deletable = false;
    }
    if (!block.isMovable() && !block.isShadow()) {
        json.movable = false;
    }
    if (!block.isEditable()) {
        json.editable = false;
    }

    var nextBlock = block.getNextBlock();
    if (nextBlock) {
        json.next = blockToJSON(nextBlock);
    }
    return json;
}

function blockToJSONWithPosition(block) {
    var json = blockToJSON(block);
    var xy = block.getRelativeToSurfaceXY();
    json.x = Math.round(block.workspace.RTL ? block.workspace.getWidth() - xy.x - block.width : xy.x);
    json.y = Math.round(xy.y);
    return json;
}

function blocksToJSON(workspace) {
    var blocks = workspace.getTopBlocks(true);
    var json = [];
    for (var block of blocks) {
        json.push(blockToJSONWithPosition(block));
    }
    return json;
}

module.exports = {
    blockToJSON,
    blockToJSONWithPosition,
    blocksToJSON
};