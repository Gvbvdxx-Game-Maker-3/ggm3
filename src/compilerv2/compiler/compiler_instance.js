var CBlockType = require("./types.js");
var { CBlockUtil } = require("./blockutil.js");
var CoreFunctions = require("./corefunc.js");

class BlockCompilerInstance {
  constructor(compiler, options) {
    this.compiler = compiler;

    if (!options) {
      throw new Error("No options provided");
    }

    this.exportCompile = options.useExportCompile || false;
    this.useBlockNumIDs = options.useBlockNumIDs || false;
    this.useDummyDef = options.useDummyDef || false;
    this.useDummyDefClicked = options.useDummyDefClicked || true;
    this.engine = options.engine || null;

    this.resetBlockIDCount();
  }

  resetBlockIDCount() {
    this._idCount = 0;
    this._ids = {};
  }

  getGGM3SafeID(id) {
    //GGM3 expects strings to be used instead of numbers.
    //GGM3 may not properly handle things if they aren't numbers.
    return `script.${id}`;
  }

  getBlockID(block) {
    var blockId = block.id;
    if (!this.useBlockNumIDs) {
      //No obfuscation, this is likely the editor so it needs the raw block IDs.
      return blockId;
    }

    //Some level of obfuscation for exporting games.
    //I'm avoiding adding local variables because of how the editor saves them in export.
    //Though these variables use IDs and aren't names directly.
    var numId = this._ids[blockId]; //Try to look up for this block's ID.

    if (typeof numId !== "undefined") {
      //We already have this ID registered.
      //In that case, just return the same one.
      //GGM3 needs this for identifying the difference between blocks.
      return this.getGGM3SafeID(numId);
    } else {
      //Note that we don't generate an new id for every getBlockID() call,
      // this is because GGM3 needs this for identifiying the different blocks running.
      
      //Generate a new ID for blocks that we don't know about yet,
      // then store them so we can return the same number ID later on.
      
      this._idCount += 1;
      var n = this._idCount;
      
      this._ids[blockId] = n;

      return this.getGGM3SafeID(n);
    }
  }

  getBlockDefinition(name, useDummy) {
    var def = this.compiler.getBlockDefinition(name);
    if (useDummy && !def) {
      return this.compiler.getDummyDefinition(name);
    }
    return def;
  }

  compileWorkspace(workspace) {
    var blocks = workspace.getTopBlocks(true);
    var output = [];
    for (var block of blocks) {
      var blockCode = this.compileHatBlock(block);

      if (blockCode) {
        //This will return null if it isn't a hat block.
        output.push({
          code: blockCode,
          id: this.getBlockID(block),
          block,
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
    var def = this.getBlockDefinition(block.type, this.useDummyDef);

    if (!def) {
      return null;
    }

    if (def.type == CBlockType.STARTER_HAT) {
      return this.compileBlock(block, {
        useDummy: this.useDummyDef,
      });
    }

    return null;
  }

  compileClickedBlock(parentBlock) {
    //Used to compile the contents of clicked block when its clicked in the editor.
    var _this = this;

    //When hat blocks are clicked, they don't get ran, they are skipped to the main code below them.
    //We have to keep going down blocks until we reach a non-hat type.
    //Usually this is looped once but this works too.
    function loop(block) {
      var def = _this.getBlockDefinition(block.type, _this.useDummyDefClicked);

      if (!def) {
        return null;
      }

      if (def.type !== CBlockType.STARTER_HAT) {
        var opts = {
          useDummy: _this.useDummyDefClicked,
        };
        var code = _this.compileBlock(block, opts);

        if (code == null) {
          return null;
        }

        var blockUtil = _this.getUtil(parentBlock, def, opts);

        if (def.type == CBlockType.OUTPUT) {
          //Output blocks are handled slightly differently compared to hats below.
          //They need to set an output value on the thread.
          return CoreFunctions.getClickedOutputBlockLogic(blockUtil, code);
        } else {
          //These are mostly the same as normal hat block scripts.
          //Except that we have to also set a thread value to tell
          // the editor this block is was ran from being clicked.
          return CoreFunctions.getClickedBlockLogic(blockUtil, code);
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

  getUtil(block, def, opts) {
    return new CBlockUtil({
      compiler: this.compiler,
      instance: this,
      block,
      parentState: opts.parentState,
      def,
      useDummy: opts.useDummy,
      options: opts,
    });
  }

  compileBlock(block, opts = {}) {
    var def = this.getBlockDefinition(block.type, opts.useDummy);

    if (!def) {
      return null;
    }

    var util = this.getUtil(block, def, opts);

    var isHat = def.type == CBlockType.STARTER_HAT;

    var code = def.callCompile(util);

    if (def.foundMissingBlock) {
      return null;
    }

    if (util.doNext && block.getNextBlock && !isHat) {
      var nextBlock = block.getNextBlock();
      if (nextBlock) {
        var nextCode = this.compileBlock(nextBlock, {
          ...opts,
          parentState: util.parentState,
        });
        if (nextCode == null) {
          return null;
        }
        return code + nextCode;
      }
    }

    return code;
  }
}

module.exports = { BlockCompilerInstance };
