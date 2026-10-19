
var { domToJSON, JSONToDom } = require("./jsonxml.js");
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
            json.mutation = domToJSON(mutation);
        }
    }

    if (block.data) {
        json.data = block.data;
    }

    json.fields = fieldsToJSON(block);
    if (json.fields.length < 1) {
        json.fields = [];
    }

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
            var shadow = input.connection.getShadowDom();
            var shadowJSON = null;
            if (shadow && (!childBlock || !childBlock.isShadow())) {
                var shadowClone = shadow.cloneNode(true);

                //We'll try to find the block manually from the workspace first.

                var shadowID = shadowClone.getAttribute("id");
                var shadowDomBlock = null;
                var removeShadowBlock = false; //We don't want to remove it since there is probably a reason why its there.
                if (shadowID && block.workspace.getBlockByID) {
                    shadowDomBlock = block.workspace.getBlockByID(shadowID);
                }

                //If we don't have it, then just make it from the XML.

                if (!shadowDomBlock) {
                    removeShadowBlock = true; //Once we clone it, we need to remove it to avoid issues.
                    shadowDomBlock = Blockly.Xml.domToBlockHeadless_(shadowClone, block.workspace);
                }
                
                //Now convert that to JSON.

                if (shadowDomBlock) {
                    shadowJSON = blockToJSON(shadowDomBlock);
                }

                //Remove it if we need it removed.

                if (removeShadowBlock) {
                    shadowDomBlock.dispose(true);
                }
            }

            if (childBlock) {
                if (shadowJSON) {
                    inputJSON.shadow = shadowJSON;
                }

                inputJSON.block = blockToJSON(childBlock);
            }

            json.inputs.push(inputJSON);
        }
    }
    if (json.inputs.length < 1) {
        json.inputs = [];
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
    json.deletable = true;
    json.movable = true;
    json.editable = true;
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
        var mutation = JSONToDom(jsonBlock.mutation);
        if (block.domToMutation) {
          block.domToMutation(mutation);
          if (block.initSvg) {
            // Mutation may have added some elements that need initializing.
            block.initSvg();
          }
        }
    }

    if (jsonBlock.comment) {
        var commentId = jsonBlock.comment.id;
        var bubbleX = +jsonBlock.comment.x;
        var bubbleY = +jsonBlock.comment.y;
        var minimized = !!jsonBlock.comment.minimized;
        block.setCommentText(
            jsonBlock.comment.text,
            commentId,
            bubbleX,
            bubbleY,
            minimized
        );

        var visible = jsonBlock.comment.pinned;
        if (visible && !block.isInFlyout) {
            setTimeout(function() {
                if (block.comment && block.comment.setVisible) {
                    block.comment.setVisible(visible);
                }
            }, 1);
        }
        var bubbleW = +jsonBlock.comment.width;
        var bubbleH = +jsonBlock.comment.height;
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

    if (jsonBlock.data) {
        block.data = jsonBlock.data;
    }

    for (var fieldJson of (jsonBlock.fields || [])) {
        JSONToField(block, fieldJson);
    }

    for (var jsonInput of (jsonBlock.inputs || [])) {
        var input = block.getInput(jsonInput.name);
        var jsonChildBlock = jsonInput.block;
        var sh = jsonInput.shadow || jsonInput.shadowDom;
        if (sh) {
            var shadowDom = null;
            if (sh.tag || sh.tagName) {
                shadowDom = JSONToDom(sh);
            } else {
                var shadowBlock = JSONToBlock(sh, workspace);
                shadowDom = Blockly.Xml.blockToDom(shadowBlock, workspace);
                shadowBlock.dispose(true);
            }

            input.connection.setShadowDom(shadowDom);
        }
        if (jsonChildBlock && input) {
            var blockChild = JSONToBlockHeadless(jsonChildBlock, workspace);
            if (blockChild.outputConnection) {
                input.connection.connect(blockChild.outputConnection);
            } else if (blockChild.previousConnection) {
                input.connection.connect(blockChild.previousConnection);
            }
        }
    }

    if (jsonBlock.next) {
        var blockChild = JSONToBlockHeadless(jsonBlock.next, workspace);
        block.nextConnection.connect(blockChild.previousConnection);
    }

    block.setInputsInline(!!jsonBlock.inline);
    block.setDisabled(!!jsonBlock.disabled);
    block.setDeletable(!!jsonBlock.deletable);
    block.setMovable(!!jsonBlock.movable);
    block.setEditable(!!jsonBlock.editable);
    block.setCollapsed(!!jsonBlock.collapsed);
    block.setShadow(!!jsonBlock.shadow);

    return block;
}

function JSONToBlock(jsonBlock, workspace) {
    Blockly.Events.disable();
    var variablesBeforeCreation = workspace.getAllVariables();

    var topBlock = JSONToBlockHeadless(jsonBlock, workspace);
    
    var blocks = topBlock.getDescendants(false);

    if (workspace.rendered) {
        topBlock.setConnectionsHidden(true);
        for (var i = blocks.length - 1; i >= 0; i--) {
            blocks[i].initSvg();
        }
        for (var i = blocks.length - 1; i >= 0; i--) {
            blocks[i].render(false);
        }

        if (!workspace.isFlyout) {
            setTimeout(function() {
                if (topBlock.workspace) {  // Check that the block hasn't been deleted.
                    topBlock.setConnectionsHidden(false);
                }
            }, 1);
        }

        topBlock.updateDisabled();

        workspace.resizeContents();
    } else {
        for (var i = blocks.length - 1; i >= 0; i--) {
            blocks[i].initModel();
        }
    }

    Blockly.Events.enable();

    var newVariables = Blockly.Variables.getAddedVariables(workspace,
        variablesBeforeCreation);
    
    for (var i = 0; i < newVariables.length; i++) {
        var thisVariable = newVariables[i];
        Blockly.Events.fire(new Blockly.Events.VarCreate(thisVariable));
    }

    Blockly.Events.fire(new Blockly.Events.BlockCreate(topBlock));

    return topBlock;
}

module.exports = {
    blockToJSON,
    blockToJSONWithPosition,
    blocksToJSON,
    JSONToBlock
};