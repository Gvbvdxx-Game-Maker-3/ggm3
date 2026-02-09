function init(state, deps) {
  function compileSpriteXML(spr) {
    async function compileRoot(rootBlock) {
      if (!rootBlock) return;
      if (deps.compiler.isStarterBlock(rootBlock)) {
        try {
          var code = deps.compiler.compileBlock(rootBlock);
          var allSprs = [spr].concat(spr.clones);
          for (var cspr of allSprs) {
            cspr.removeSpriteFunction(rootBlock.id);
            cspr.addFunction(code, rootBlock.id);
            cspr.runFunctionID(rootBlock.id);
          }
        } catch (e) {
          return;
        }
      }
    }
    var div = document.createElement("div");
    document.body.append(div);
    var tempWorkspace = Blockly.inject(div, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../media/",
      readOnly: false,
      rtl: false,
      scrollbars: false,
      trashcan: false,
      sounds: false,
    });

    if (spr.blocklyXML) {
      Blockly.Xml.domToWorkspace(spr.blocklyXML, tempWorkspace);
    }

    var blocks = tempWorkspace.getTopBlocks(true);
    for (var block of blocks) {
      compileRoot(block.getRootBlock());
    }

    tempWorkspace.dispose();
    div.remove();
  }

  async function compileAllSprites() {
    async function compileRoot(rootBlock, spr) {
      if (!rootBlock) return;
      if (deps.compiler.isStarterBlock(rootBlock)) {
        try {
          var code = deps.compiler.compileBlock(rootBlock);
          var allSprs = [spr].concat(spr.clones);
          for (var cspr of allSprs) {
            cspr.removeSpriteFunction(rootBlock.id);
            cspr.addFunction(code, rootBlock.id);
            cspr.runFunctionID(rootBlock.id);
          }
        } catch (e) {
          return;
        }
      }
    }
    var div = document.createElement("div");
    document.body.append(div);
    var tempWorkspace = Blockly.inject(div, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../media/",
      readOnly: false,
      rtl: false,
      scrollbars: false,
      trashcan: false,
      sounds: false,
    });
    tempWorkspace.setVisible(false);
    div.style.display = "none";

    for (var spr of deps.engine.sprites) {
      tempWorkspace.clear();

      if (spr.blocklyXML) {
        Blockly.Xml.domToWorkspace(spr.blocklyXML, tempWorkspace);
      }

      var blocks = tempWorkspace.getTopBlocks(true);
      for (var block of blocks) {
        compileRoot(block.getRootBlock(), spr);
        await new Promise((r) => setTimeout(r, 2));
      }
      await new Promise((r) => setTimeout(r, 2));
    }

    tempWorkspace.dispose();
    div.remove();
  }

  // helper used by other UI code to show a sprite's workspace in a temp area
  function loadWorkspaceFromSprite(spr) {
    var div = document.createElement("div");
    document.body.append(div);
    var tempWorkspace = Blockly.inject(div, {
      comments: true,
      disable: false,
      collapse: false,
      media: "../media/",
      readOnly: false,
      rtl: false,
      scrollbars: false,
      trashcan: false,
      sounds: false,
    });

    if (spr.blocklyXML) {
      Blockly.Xml.domToWorkspace(spr.blocklyXML, tempWorkspace);
    }

    return tempWorkspace;
  }

  return { compileSpriteXML, compileAllSprites, loadWorkspaceFromSprite };
}

module.exports = { init };
