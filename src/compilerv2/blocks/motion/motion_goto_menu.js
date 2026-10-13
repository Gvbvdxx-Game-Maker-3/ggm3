
BlockCompiler.defineBlock("motion_goto_menu", {
  type: CBlockType.OUTPUT,
  func: function (util) {
    var TO = util.getField("TO", "");
    return JSON.stringify(TO);
  },
});