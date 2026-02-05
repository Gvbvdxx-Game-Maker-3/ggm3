var blocks = require("../blocks.js");

var { createBlockContextMenu } = require("./someutils.js");

function getBlockPosAndXMax(block) {
  const { x, y } = block.getRelativeToSurfaceXY();
  const width = block.getRootBlock().getHeightWidth().width;
  return block.RTL
    ? { pos: { x: x + width, y }, xMax: x }
    : { pos: { x, y }, xMax: x + width };
}

function makeSpaceInWorkspace(targetBlock) {
  const wksp = blocks.getCurrentWorkspace();

  const topBlocks = wksp.getTopBlocks();
  const { pos: tPos, xMax: tXMax } = getBlockPosAndXMax(targetBlock);
  const targetRoot = targetBlock.getRootBlock();
  const isRTL = targetBlock.RTL;

  // TODO: move shift distances to a setting option defined in multiples of grid spacing
  const maxXShift = 380,
    maxYShift = 410;
  let minXShift = maxXShift,
    minYShift = maxYShift;

  // first pass we determine if a block stack should be shifted
  // and if it should be shifted and is closer than maxShift we update the min shift distance
  const shouldShift = [];
  for (const topBlock of topBlocks) {
    if (topBlock === targetRoot) continue;
    const { pos, xMax } = getBlockPosAndXMax(topBlock);

    const withinColumn = isRTL
      ? tPos.x >= xMax && pos.x >= tXMax
      : tPos.x <= xMax && pos.x <= tXMax;

    const shouldShiftX = pos.x < tXMax === isRTL;
    const shouldShiftY = pos.y > tPos.y && withinColumn;
    shouldShift.push([topBlock, shouldShiftX, shouldShiftY]);

    if (shouldShiftX && Math.abs(pos.x - tXMax) < minXShift)
      minXShift = Math.abs(pos.x - tXMax);
    if (shouldShiftY && pos.y - tPos.y < minYShift) minYShift = pos.y - tPos.y;
  }

  // in the second pass we apply a shift based on the min shift to all the blocks we found should be shifted in the first pass
  const shiftX = (isRTL ? -1 : 1) * (maxXShift - minXShift);
  const shiftY = maxYShift - minYShift;
  for (const [block, shldShiftX, shldShiftY] of shouldShift)
    block.moveBy(shiftX * shldShiftX, shiftY * shldShiftY);
}

createBlockContextMenu(
  (items, block) => {
    items.push(
      {
        separator: true,
        _isDevtoolsFirstItem: true,
      },
      {
        enabled: true,
        text: "Make space",
        callback: () => {
          makeSpaceInWorkspace(block, blocks.getCurrentWorkspace());
        },
      },
    );

    return items;
  },
  { blocks: true },
);
