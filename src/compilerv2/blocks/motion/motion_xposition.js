
BlockCompiler.defineBlock("motion_xposition", {
  type: CBlockType.OUTPUT,
  func: function (util) {
    return `sprite.x`;
  },
});