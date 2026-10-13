
BlockCompiler.defineBlock("motion_gotoxy", {
  type: CBlockType.COMMAND,
  func: function (util) {
    var X = util.getInput("X", "0");
    var Y = util.getInput("Y", "0");

    return `sprite.x = +(${X}) || 0; sprite.y = +(${Y}) || 0;`;
  },
});