function init(state, deps) {
  function compileSpriteXML(spr) {
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

    deps.EditorData.loadSpriteEditorData(spr, tempWorkspace);

    var compiledBlocks = deps.compilerInstance.compileWorkspace(tempWorkspace);
    //console.log(compiledBlocks);
    var allSprs = [spr].concat(spr.clones);
    for (var cspr of allSprs) {
      deps.compilerInstance.applyCompiledToEditorSprite(cspr, compiledBlocks);
    }

    tempWorkspace.dispose();
    div.remove();
  }

  function compileSpriteXMLToString(spr, compilerInstance = deps.compilerInstance) {
    var functions = {};
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

    deps.EditorData.loadSpriteEditorData(spr, tempWorkspace);

    var compiledBlocks = compilerInstance.compileWorkspace(tempWorkspace);
    for (var compiledBlock of compiledBlocks) {
      functions[compiledBlock.id] = compiledBlock.code;
    }
    
    tempWorkspace.dispose();
    div.remove();

    return functions;
  }

  async function compileAllSprites() {
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

      deps.EditorData.loadSpriteEditorData(spr, tempWorkspace);

      var compiledBlocks = deps.compilerInstance.compileWorkspace(tempWorkspace);
      //console.log(compiledBlocks);
      var allSprs = [spr].concat(spr.clones);
      for (var cspr of allSprs) {
        deps.compilerInstance.applyCompiledToEditorSprite(cspr, compiledBlocks);
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

    deps.EditorData.loadSpriteEditorData(spr, tempWorkspace);

    return tempWorkspace;
  }

  return {
    compileSpriteXML,
    compileAllSprites,
    loadWorkspaceFromSprite,
    compileSpriteXMLToString,
  };
}

module.exports = { init };
