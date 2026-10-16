var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("procedures_definition", {
  type: CBlockType.STARTER_HAT,
  func: function (utils) {
    var customBlock = utils.getInputBlock("custom_block");
    if (!customBlock) {
      //Broken custom block definition so this does nothing.
      return "";
    }

    var argumentIds = customBlock.argumentIds_;
    var displayNames = customBlock.displayNames_;
    var procCode = customBlock.procCode_;
    var insideCode = utils.getHatContents("");
    var BLOCK_ID = JSON.stringify(utils.getID());

    var threadModifierCode = ""; //Custom blocks provide some additional stuff for the thread

    threadModifierCode += `thread.customBlockInherit(parentThread);`;

    if (customBlock.warp_) {
      //Run without refresh enabled.
      threadModifierCode += `thread.turnOnWithoutRefresh();`;
    }

    argumentIds.forEach((argId, i) => {
      var name = displayNames[i];
      threadModifierCode += `thread.customBlockValues[${JSON.stringify(name)}] = customArgs[${JSON.stringify(argId)}];`;
    });

    var fullInsideCode = CoreFunctions.putThreadStack(
      utils,
      threadModifierCode + insideCode,
    );

    var code = "";
    code += `sprite.addCustom(`;
    code += `${JSON.stringify(BLOCK_ID)}, `;
    code += `${JSON.stringify(procCode)}, `;
    code += `async function (customArgs,parentThread) {`;
    code += fullInsideCode;
    code += `});`;

    return code;
  },
});
