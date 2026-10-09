var CBlockType = require("./types.js");

class CBlockUtil {
    constructor ({ compiler, def, instance, block, parentState }) {
        this.compiler = compiler;
        this.instance = instance;
        this.def = def;
        this.block = block;
        this.isBlockUtil = true;
        this.parentState = parentState || {}; //this gets passed to the next block, and goes further also.
    }

    compileBlock(block) {
        return this.instance.compileBlock(block, this.parentState);
    }

    getID () {
        return this.instance.getBlockID(this.block);
    }

    get id() {
        return this.getID();
    }

    getHatContents (fallback = "") {
        if (this.def.type !== CBlockType.STARTER_HAT) {
            //We aren't even a hat block!
            //Warn here because it feels important to note.
            console.warn("Compiler: Tried to getHatContents() on a non-hat block: ",this, "\nMake sure that this block has its correct compiler definition.");
            return fallback;
        }

        var block = this.block;

        if (!block.getNextBlock) {
            return fallback;
        }

        var nextBlock = block.getNextBlock();
        if (!nextBlock) {
            return fallback;
        }

        return this.compileBlock(nextBlock);
    }

    getInput (name, fallback = "null") {
        var block = this.getInputBlock(name);
        if (!block) {
            return fallback;
        }

        return this.compileBlock(block);
    }

    getBlocklyInput (name) {
        var block = this.block;

        if (!block.inputList) {
            return null;
        }

        for (var input of block.inputList) {
            if (input.name == name) {
                return input;
            }
        }

        return null;
    }

    getInputBlock (name) {
        //This doesn't return an CBlockUtil, rather just the actual blockly block itself.
        
        var input = this.getBlocklyInput(name);
        if (!input) {
            return null;
        }

        var inputBlock = input.connection.targetBlock();
        
        return inputBlock || null;
    }

    getField (name, fallback = "") {
        var field = this.getBlocklyField(name);
        if (!field) {
            return fallback;
        }

        if (field.referencesVariables()) {
            return fallback;
        }

        return field.getValue();
    }

    getFieldText (name, fallback = "") {
        var field = this.getBlocklyField(name);
        if (!field) {
            return fallback;
        }

        if (field.referencesVariables()) {
            return fallback;
        }

        return field.getText();
    }

    getFieldVariable (name) {
        var field = this.getBlocklyField(name);
        if (!field) {
            return null;
        }

        if (!field.referencesVariables()) {
            return null;
        }

        var variable = field.getVariable();
        if (!variable) {
            return null;
        }

        return {
            name: variable.name,
            id: variable.getId()
        };
    }

    getBlocklyField (name) {
        var block = this.block;
        
        for (var input of block.inputList) {
            for (var field of input.fieldRow) {
                if (field.name && field.SERIALIZABLE) {
                    if (field.name == name) {
                        return field;
                    }
                }
            }
        }

        return null;
    }
}

module.exports = {CBlockUtil};