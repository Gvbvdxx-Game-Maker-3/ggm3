
var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("procedures_definition", {
  type: CBlockType.STARTER_HAT,
  func: function (utils) {
    var customBlockInput = utils.getBlocklyInput("custom_block");
    if (!customBlockInput) {
        //Broken custom block definition so this does nothing.
        return "";
    }

    var argumentIds = customBlockInput.argumentIds_;
    var valueNameCode = "";
    argumentIds.forEach((argId, i) => {
        var name = customBlockInput.displayNames_[i];
        valueNameCode += `thread.customBlockValues[${JSON.stringify(name)}] = customBlockArgs[${JSON.stringify(argId)}];`;
    });

    var insideCode = utils.getHatContents("");
    var fullInsideCode = CoreFunctions.putThreadStack(utils.block, insideCode);

    var procCode = utils.block.procCode_;

    var BLOCK_ID = JSON.stringify(utils.getID());

    var code = "";
    code += `sprite.addCustom(`
    code += `${JSON.stringify(BLOCK_ID)}, `;
    code += BLOCK_ID + ",";
    code += `async function () {`;
    code += fullInsideCode;
    code += `});`;
    

    return code;
  },
});