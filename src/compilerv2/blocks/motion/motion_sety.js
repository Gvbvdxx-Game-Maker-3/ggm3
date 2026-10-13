
BlockCompiler.defineBlock("motion_sety", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var Y = util.getInput("Y", "0");

    return `sprite.y = +(${Y}) || 0;`;
  },
});