
var { mutationToJSON } = require("./mutation.js");
var { fieldsToJSON } = require("./fields.js");

function blockToJSON(block) {
    var json = {};

    if (block.isShadow()) {
        json.shadow = true;
    }

    json.type = block.type;

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
}

function blocksToJSON(workspace) {
    var blocks = workspace.getTopBlocks(true);

}

module.exports = {
    blocksToJSON
};