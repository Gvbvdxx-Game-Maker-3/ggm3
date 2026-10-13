var CBlockType = require("./types.js");
var { BlockCompilerInstance } = require("./compiler_instance.js");
var { CBlockDefinition } = require("./blockdef.js");
var DummyBlockDef = require("./dummydef.js");

class BlockCompiler {
  constructor() {
    this.blocks = {};
  }

  newInstance(options) {
    return new BlockCompilerInstance(this, options);
  }

  defineBlock(name, options) {
    if (typeof name !== "string") {
      throw new Error("First argument 'name' is not string");
    }
    if (typeof options !== "object") {
      throw new Error("Second argument 'options' is not object.");
    }

    var block = new CBlockDefinition(name, options);
    this.blocks[name] = block;
  }

  removeBlock(name) {
    this.blocks[name] = "";
    delete this.blocks[name];
  }

  getBlockDefinition(name) {
    var def = this.blocks[name];
    if (def) {
      return def;
    }
    return null;
  }

  getDummyDefinition(name) {
    return new DummyBlockDef(name);
  }

  checkBlockType(block, targetType) {
    //Provided is blockly block
    var def = this.getBlockDefinition(block.type);
    if (!def) {
      return false;
    }
    return def.type == targetType;
  }

  isStarterBlock(block) {
    return this.checkBlockType(block, CBlockType.STARTER_HAT);
  }

  isOutputBlock(block) {
    return this.checkBlockType(block, CBlockType.OUTPUT);
  }

  isCommandBlock(block) {
    return this.checkBlockType(block, CBlockType.COMMAND);
  }

  isHatBlock(block) {
    //Starter is actually called hat or STARTER_HAT sometimes.
    return this.isStarterBlock(block);
  }
}

module.exports = new BlockCompiler();
