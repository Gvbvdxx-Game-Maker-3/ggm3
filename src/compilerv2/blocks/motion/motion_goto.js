
BlockCompiler.defineBlock("motion_goto", {
  type: CBlockType.OUTPUT,
  func: function (util) {
    var TO = util.getInput("TO", "null");
    return `sprite.goTo(${TO});`;
  },
});