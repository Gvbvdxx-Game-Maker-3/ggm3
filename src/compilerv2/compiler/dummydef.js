var CBlockType = require("./types.js");

function dummyFunc(util) {
  var TYPE = JSON.stringify(util.block.type);
  return `throw new Error("Block type "+${TYPE}+" doesn't exist in compiler, make sure to add this first.");`;
}

class CBlockDummyDefinition {
  constructor(name) {
    this.name = name;
    this.func = dummyFunc;
    this.type = CBlockType.COMMAND;
    this.isDummy = true;
  }

  callCompile(blockUtil) {
    return this.func(blockUtil);
  }
}

module.exports = CBlockDummyDefinition;
