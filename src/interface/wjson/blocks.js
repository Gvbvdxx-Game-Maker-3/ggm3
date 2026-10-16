
var { mutationToJSON, JSONToMutation } = require("./mutation.js");
var { fieldsToJSON, JSONToField } = require("./fields.js");
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

function JSONToBlockHeadless(jsonBlock, workspace) {
    var block = workspace.newBlock(jsonBlock.type, jsonBlock.id);

    if (jsonBlock.mutation) {
        var mutation = JSONToMutation(jsonBlock.mutation);
        if (block.domToMutation) {
          block.domToMutation(mutation);
          if (block.initSvg) {
            // Mutation may have added some elements that need initializing.
            block.initSvg();
          }
        }
    }

    if (json.comment) {
        var commentId = json.comment.id;
        var bubbleX = +json.comment.x;
        var bubbleY = +json.comment.y;
        var minimized = !!json.comment.minimized;
        block.setCommentText(
            json.comment.text,
            commentId,
            bubbleX,
            bubbleY,
            minimized
        );

        var visible = json.comment.pinned;
        if (visible && !block.isInFlyout) {
            setTimeout(function() {
                if (block.comment && block.comment.setVisible) {
                    block.comment.setVisible(visible);
                }
            }, 1);
        }
        var bubbleW = +json.comment.width;
        var bubbleH = +json.comment.height;
        if (
            !isNaN(bubbleW) &&
            !isNaN(bubbleH) &&
            block.comment &&
            block.comment.setVisible
        ) {
            if (block.comment instanceof Blockly.ScratchBlockComment) {
                block.comment.setSize(bubbleW, bubbleH);
            } else {
                block.comment.setBubbleSize(bubbleW, bubbleH);
            }
        }
    }

    if (json.data) {
        block.data = json.data;
    }

    

    for (var jsonInput of jsonBlock.inputs) {
        var input = block.getInput(jsonInput.name);
        var jsonChildBlock = jsonInput.block;
        if (jsonChildBlock && input) {
            var blockChild = JSONToBlockHeadless(jsonChildBlock, workspace);
            if (blockChild.outputConnection) {
                input.connection.connect(blockChild.outputConnection);
            } else if (blockChild.previousConnection) {
                input.connection.connect(blockChild.previousConnection);
            }
        }
    }
}

function JSONToBlock(jsonBlock, workspace) {

}

module.exports = {
    blockToJSON,
    blockToJSONWithPosition,
    blocksToJSON,
    JSONToBlock
};