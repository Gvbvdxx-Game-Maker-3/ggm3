
var CBlockType = require("./types.js");
var {CBlockUtil} = require("./blockutil.js");
var CoreFunctions = require("./corefunc.js");

class BlockCompilerInstance {
    constructor(compiler, options) {
        this.compiler = compiler;

        if (!options) {
            throw new Error("No options provided");
        }

        this.exportCompile = options.useExportCompile || false;
        this.useBlockNumberIDs = options.useBlockNumberIDs || false;

        this.resetBlockIDCount();

    }

    resetBlockIDCount() {
        this._idCount = 0;
        this._ids = {};
    }

    getBlockID(block) {
        if (this.useBlockNumberIDs) {
            var numId = this._ids[block.id];
            if (typeof numId !== "undefined") {
                return numId;
            } else {
                this._idCount += 1;
                this._ids[block.id] = this._idCount;
                return this._idCount;
            }
        } else {
            return block.id;
        }
    }

    getBlockDefinition(name) {
        return this.compiler.getBlockDefinition(name);
    }

    compileWorkspace(workspace) {
        var blocks = workspace.getTopBlocks(true);
        var output = [];
        for (var block of blocks) {
            var blockCode = this.compileHatBlock(block);

            if (blockCode) { //This will return null if it isn't a hat block.
                output.push({
                    code: blockCode,
                    id: block.id,
                    block
                });
            }
        }
        return output;
    }

    applyCompiledToEditorSprite(sprite, workspaceCompileOutput) {
        for (var compiledHat of workspaceCompileOutput) {
            sprite.removeStackListener(compiledHat.id);
            sprite.removeSpriteFunction(compiledHat.id);
            sprite.addFunction(compiledHat.code, compiledHat.id);
            sprite.runFunctionID(compiledHat.id);
        }
    }

    compileHatBlock(block) {
        //This is just a pass through except it compares to hat blocks
        // and only would compile if it is an hat blocks.
        var def = this.getBlockDefinition(block.type);

        if (!def) {
            return null;
        }

        if (def.type == CBlockType.STARTER_HAT) {
            return this.compileBlock(block);
        }

        return null;
    }

    compileClickedBlock(parentBlock) { //Used to compile the contents of clicked block when its clicked in the editor.
        var _this = this;
        
        function loop(block) {
            var def = _this.getBlockDefinition(block.type);

            if (!def) {
                return null;
            }

            if (def.type !== CBlockType.STARTER_HAT) {
                var code = _this.compileBlock(block);

                if (def.type == CBlockType.OUTPUT) {
                    //Output blocks are handled slightly differently compared to hats below.
                    //They need to set an output value on the thread.
                    return CoreFunctions.getClickedOutputBlockLogic(parentBlock, code);
                } else {
                    //These are mostly the same as normal hat block scripts.
                    //Except that we have to also set a thread value to tell
                    // the editor this block is was ran from being clicked.
                    return CoreFunctions.getClickedBlockLogic(parentBlock, code);
                }

            }

            if (block.getNextBlock) {
                var nextBlock = block.getNextBlock();
                if (nextBlock) {
                    return loop(nextBlock);
                }
            }

            return null;
        }

        return loop(parentBlock);
    }

    compileBlock(block, parentState) {
        var def = this.getBlockDefinition(block.type);
        var util = new CBlockUtil({
            compiler: this.compiler,
            instance: this,
            block,
            parentState,
            def
        });

        var isHat = def.type == CBlockType.STARTER_HAT;

        var code = def.callCompile(util);

        if (block.getNextBlock && !isHat) {
            var nextBlock = block.getNextBlock();
            if (nextBlock) {
                return code + this.compileBlock(nextBlock, util.parentState);
            }
        }

        return code;
    }
}

module.exports = {BlockCompilerInstance};