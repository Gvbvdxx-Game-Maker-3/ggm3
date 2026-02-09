function init(state, deps) {
  var workspace = null;
  var disposingWorkspace = false;

  function saveScroll() {
    if (!workspace) return;
    var spr = state.currentSelectedSprite;
    var flyoutWorkspace = workspace.getFlyout().getWorkspace();
    spr._flyout_scrollX = flyoutWorkspace.scrollX;
    spr._flyout_scrollY = flyoutWorkspace.scrollY;
    spr._flyout_scale = flyoutWorkspace.scale;

    spr._editor_scrollX = workspace.scrollX;
    spr._editor_scrollY = workspace.scrollY;
    spr._editor_scale = workspace.scale;
  }

  function scrollToPrevious() {
    if (!workspace) return;
    var spr = state.currentSelectedSprite;
    if (typeof spr._editor_scrollX == "number") {
      Blockly.svgResize(workspace);
      workspace.scrollX = spr._editor_scrollX;
      workspace.scrollY = spr._editor_scrollY;
      workspace.scale = spr._editor_scale;

      var flyoutWorkspace = workspace.getFlyout().getWorkspace();
      flyoutWorkspace.scrollX = spr._flyout_scrollX || 0;
      flyoutWorkspace.scrollY = spr._flyout_scrollY || 0;
      flyoutWorkspace.scale = spr._flyout_scale || 0;
      flyoutWorkspace.resize();

      workspace.resize();
      Blockly.svgResize(workspace);
    }
  }

  function handleSpriteErrorLog(spr) {
    deps.ui.errorLogsContainerRef.innerHTML = "";
    var willScroll = false;
    if (
      deps.ui.errorLogsContainerRef.scrollTop + deps.ui.errorLogsContainerRef.offsetHeight + 2 >=
      deps.ui.errorLogsContainerRef.scrollHeight
    ) {
      willScroll = true;
    }
    for (var error of spr.errorLogs) {
      var logDiv = deps.ui.getErrorLogDiv(error);
      deps.ui.errorLogsContainerRef.appendChild(logDiv);
    }
    if (willScroll) {
      deps.ui.errorLogsContainerRef.scrollTo(0, deps.ui.errorLogsContainerRef.scrollHeight);
    }

    spr.onErrorLog = function (error) {
      var willScroll = false;
      if (
        deps.ui.errorLogsContainerRef.scrollTop + deps.ui.errorLogsContainerRef.offsetHeight + 2 >=
        deps.ui.errorLogsContainerRef.scrollHeight
      ) {
        willScroll = true;
      }
      var logDiv = deps.ui.getErrorLogDiv(error);
      deps.ui.errorLogsContainerRef.appendChild(logDiv);
      if (willScroll) {
        deps.ui.errorLogsContainerRef.scrollTo(0, deps.ui.errorLogsContainerRef.scrollHeight);
      }
    };
  }

  function loadCode(spr) {
    if (!spr) return;
    deps.loadBlockMenus(spr);
    disposingWorkspace = true;
    Blockly.Events.disable();
    deps.blocks.createFreshWorkspace(spr);
    workspace = deps.blocks.getCurrentWorkspace();
    if (spr.blocklyXML) {
      Blockly.Xml.domToWorkspace(spr.blocklyXML, workspace);
    }
    var currentBlocks = {};
    var currentBlockParentIDs = {};

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
          workspace.reportValue(rootBlock.id, "Unable to compile: " + e);
          console.error(`Unable to compile block `, e);
          return;
        }
      }
    }

    function compileAll() {
      var blocks = workspace.getTopBlocks(true);
      for (var block of blocks) {
        compileRoot(block.getRootBlock());
      }
    }

    function unglowErrorOnBlock(blockId) {
      try {
        var changedBlock = workspace.getBlockById(blockId);
        if (changedBlock && changedBlock.getSvgRoot) {
          var changedSvg = changedBlock.getSvgRoot();
          if (changedSvg && changedSvg.classList) changedSvg.classList.remove("error-glow");
          try {
            var errFilterId2 = workspace.options && workspace.options.errorGlowFilterId;
            if (
              errFilterId2 &&
              changedSvg &&
              changedSvg.getAttribute &&
              changedSvg.getAttribute("filter") === "url(#" + errFilterId2 + ")"
            ) {
              changedSvg.removeAttribute("filter");
            }
          } catch (innerErr) {}
        }
      } catch (err) {}
    }

    workspace.addChangeListener(function (e) {
      if (disposingWorkspace) return;
      spr.editorScanVariables(workspace);

      if (e.element == "click") {
        var clickedBlock = workspace.getBlockById(e.blockId);
        if (clickedBlock && clickedBlock.getSvgRoot) {
          try {
            var svg = clickedBlock.getSvgRoot();
            if (svg && svg.classList) svg.classList.remove("error-glow");
            try {
              var errFilterId = workspace.options && workspace.options.errorGlowFilterId;
              if (
                errFilterId &&
                svg &&
                svg.getAttribute &&
                svg.getAttribute("filter") === "url(#" + errFilterId + ")"
              ) {
                svg.removeAttribute("filter");
              }
            } catch (inner) {}
          } catch (err) {}
        }
        var root = clickedBlock.getRootBlock();
        if (!spr.runningStacks[root.id]) {
          (async function () {
            var code = deps.compiler.compileBlockWithThreadForced(root);
            var outputThread = await spr.runFunction(code);
            if (outputThread) {
              if (deps.compiler.isOutputBlock(root) || typeof outputThread.output !== "undefined") {
                workspace.reportValue(e.blockId, deps.valueReport(outputThread.output));
              }
            }
          })();
        } else {
          spr.runningStacks[root.id].stop();
        }
      } else if (e.blockId && e.element !== "stackclick") {
        var eventBlock = workspace.getBlockById(e.blockId);

        if (!eventBlock) {
          if (currentBlocks[e.blockId]) {
            var thread = spr.runningStacks[e.blockId];
            if (thread) thread.stop();
          }
          spr.removeSpriteFunction(e.blockId);
          spr.removeStackListener(e.blockId);
          delete currentBlocks[e.blockId];

          if (e.oldParentId) {
            var oldParentBlock = workspace.getBlockById(e.oldParentId);
            if (oldParentBlock) {
              unglowErrorOnBlock(oldParentBlock.getRootBlock().id);
              compileAll();
            }
          }
        } else {
          currentBlocks[e.blockId] = true;
          var newRoot = eventBlock.getRootBlock();
          compileAll();

          if ((e instanceof Blockly.Events.Move || e.type == "move") && e.oldParentId) {
            var oldParentBlock = workspace.getBlockById(e.oldParentId);
            if (oldParentBlock) {
              var oldRoot = oldParentBlock.getRootBlock();
              if (oldRoot.id !== newRoot.id) {
                unglowErrorOnBlock(oldRoot.id);
                compileAll();
              }
            }
          }

          if (e.blockId) {
            unglowErrorOnBlock(e.blockId);
          }
        }
      }
    });

    var flyoutWorkspace = workspace.getFlyout().getWorkspace();
    flyoutWorkspace.addChangeListener(function (e) {
      spr.editorScanVariables(workspace);
      if (e.element == "click") {
        var root = workspace.getBlockById(e.blockId).getRootBlock();
        if (!spr.runningStacks[root.id]) {
          (async function () {
            var code = deps.compiler.compileBlockWithThreadForced(root);
            var outputThread = await spr.runFunction(code);
            if (outputThread) {
              if (deps.compiler.isOutputBlock(root) || typeof outputThread.output !== "undefined") {
                workspace.reportValue(e.blockId, deps.valueReport(outputThread.output));
              }
            }
          })();
        } else {
          spr.runningStacks[root.id].stop();
        }
      }
    });

    for (var id of Object.keys(spr.runningStacks)) {
      if (workspace.getBlockById(id)) {
        workspace.glowStack(id, true);
      }
    }
    var endTimeouts = {};
    spr.threadStartListener = function (id) {
      if (disposingWorkspace) return;
      if (workspace.getBlockById(id)) {
        if (typeof endTimeouts[id] !== "undefined") clearTimeout(endTimeouts[id]);
        workspace.glowStack(id, true);
      }
    };
    spr.threadEndListener = function (id, isPreviewMode) {
      if (disposingWorkspace) return;
      if (workspace.getBlockById(id)) {
        if (typeof endTimeouts[id] !== "undefined") clearTimeout(endTimeouts[id]);
        endTimeouts[id] = setTimeout(() => {
          delete endTimeouts[id];
          if (workspace.getBlockById(id)) {
            workspace.glowStack(id, false);
            try {
              var b = workspace.getBlockById(id);
              if (b && b.getSvgRoot) {
                var svg = b.getSvgRoot();
                if (svg && svg.classList) svg.classList.remove("error-glow");
                try {
                  var errFilterId = workspace.options && workspace.options.errorGlowFilterId;
                  if (errFilterId && svg && svg.getAttribute && svg.getAttribute("filter") === "url(#" + errFilterId + ")") {
                    svg.removeAttribute("filter");
                  }
                } catch (inner) {}
              }
            } catch (e) {}
          }
        }, 1000 / 30);
      }
    };

    spr.threadErrorListener = function (id, output) {
      if (disposingWorkspace) return;
      if (workspace.getBlockById(id)) {
        if (typeof endTimeouts[id] !== "undefined") clearTimeout(endTimeouts[id]);
        workspace.glowStack(id, true);
        try {
          var b = workspace.getBlockById(id);
          if (b && b.getSvgRoot) {
            var svg = b.getSvgRoot();
            if (svg && svg.classList) svg.classList.add("error-glow");
            try {
              var errFilterId = workspace.options && workspace.options.errorGlowFilterId;
              if (errFilterId && svg && svg.setAttribute) {
                svg.setAttribute("filter", "url(#" + errFilterId + ")");
              }
            } catch (inner) {}
          }
        } catch (e) {
          console.warn("Failed to add error-glow filter/class", e);
        }
      }
    };

    setTimeout(function () {
      Blockly.svgResize(workspace);
    }, 0);

    scrollToPrevious();

    disposingWorkspace = false;
    Blockly.Events.enable();
    workspace.getToolbox().refreshSelection();
    return { scrollToPrevious };
  }

  function saveCurrentSpriteCode() {
    if (state.currentSelectedSprite && workspace) {
      state.currentSelectedSprite.blocklyXML = Blockly.Xml.workspaceToDom(workspace);
    }
  }

  return { loadCode, saveScroll, scrollToPrevious, handleSpriteErrorLog, saveCurrentSpriteCode };
}

module.exports = { init };
