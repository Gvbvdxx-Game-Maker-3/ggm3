
class EditorUtils {

    static findBlocks(workspaceData, targetBlockTypes) {
        var found = [];
        var foundIDs = [];
        function loop(block) {
            var match = false;
            for (var type of targetBlockTypes) {
                if (block.type == type) {
                    match = true;
                }
            }
            if (match && foundIDs.indexOf(block.id) == -1) {
                foundIDs.push(block.id);
                found.push(block);
            }
            if (block.inputs) {
                for (var input of block.inputs) {
                    if (input.block) {
                        loop(input.block);
                    }
                }
            }
            if (block.next) {
                loop(block.next);
            }
        }

        for (var block of workspaceData.blocks) {
            loop(block);
        }
        
        return found;
    }

    static getField(name, blockData) {
        for (var field of (blockData.fields || [])) {
            if (field.name == name) {
                return field;
            }
        }
        return null;
    }
}

module.exports = EditorUtils;