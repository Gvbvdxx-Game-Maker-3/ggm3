
class EditorUtils {

    static findBlocks(workspaceData, targetBlockTypes) {
        var found = [];
        function loop(block) {
            var match = false;
            for (var type of targetBlockTypes) {
                if (block.type == type) {
                    match = true;
                }
            }
            if (match) {
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
            found.push(loop(block));
        }
        return found;
    }

    static getField(name, blockData) {
        for (var field of (blockData.fields || [])) {
            
        }
        return null;
    }
}

module.exports = EditorUtils;