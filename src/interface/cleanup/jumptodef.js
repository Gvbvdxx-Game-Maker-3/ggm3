var blocks = require("../blocks.js");
var { createBlockContextMenu, scrollBlockIntoView } = require("./someutils.js");

function jumpToBlockDefinition(block) {
  let findProcCode = block.getProcCode();

  let topBlocks = blocks.getCurrentWorkspace().getTopBlocks();
  for (const root of topBlocks) {
    if (root.type === "procedures_definition") {
      let label = root.getChildren()[0];
      let procCode = label.getProcCode();
      if (procCode && procCode === findProcCode) {
        // Found... navigate to it!
        scrollBlockIntoView(root);
      }
    }
  }
}

Object.defineProperty(Blockly.Gesture.prototype, "jumpToDef", {
  get() {
    return false;
  },
});

const doBlockClickMethodName = Blockly.registry
  ? "doBlockClick"
  : "doBlockClick_";
const _doBlockClick_ = Blockly.Gesture.prototype[doBlockClickMethodName];
Blockly.Gesture.prototype[doBlockClickMethodName] = function () {
  const event = Blockly.registry ? this.mostRecentEvent : this.mostRecentEvent_;
  if (true && (event.button === 1 || event.shiftKey)) {
    // Wheel button...
    // Intercept clicks to allow jump to...?
    let block = Blockly.registry ? this.startBlock : this.startBlock_;
    for (; block; block = block.getSurroundParent()) {
      if (block.type === "procedures_call") {
        jumpToBlockDefinition(block);
        return;
      }
    }
  }

  _doBlockClick_.call(this);
};

createBlockContextMenu(
  (items, block) => {
    if (true && block.type === "procedures_call") {
      items.push({
        enabled: true,
        text: "Jump to definition",
        callback: () => jumpToBlockDefinition(block),
      });
    }
    return items;
  },
  { blocks: true, flyout: true },
);
