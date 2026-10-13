
BlockCompiler.defineBlock("motion_yposition", {
  type: CBlockType.OUTPUT,
  func: function (util) {
    return `sprite.y`;
  },
});