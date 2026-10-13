var CBlockType = require("./types.js");

class CBlockDefinition {
  constructor(name, options) {
    this.name = name;
    this.func = options.func || (() => {});
    this.type = options.type;
    this.isDummy = false;

    this.checkType();
  }

  checkType() {
    var type = this.type;
    if (type !== CBlockType.COMMAND) {
      return;
    }
    if (type !== CBlockType.OUTPUT) {
      return;
    }
    if (type !== CBlockType.STARTER_HAT) {
      return;
    }
    throw new Error(
      `Compiler block definition got type ${type} instead of one of the CBlockType types, please use only the CBlockType types.`,
    );
    return;
  }

  callCompile(blockUtil) {
    return this.func(blockUtil);
  }
}

module.exports = { CBlockDefinition };
