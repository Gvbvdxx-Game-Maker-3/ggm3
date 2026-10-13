
BlockCompiler.defineBlock("motion_changeyby", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var DY = util.getInput("DY", "0");

    return `sprite.y += +(${DY}) || 0;`;
  },
});