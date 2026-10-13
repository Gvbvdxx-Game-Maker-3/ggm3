
BlockCompiler.defineBlock("motion_direction", {
  type: CBlockType.OUTPUT,
  func: function (util) {
    return `sprite.direction`;
  },
});