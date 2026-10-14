var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("procedures_call", {
  type: CBlockType.COMMAND,
  func: function (utils) {
    var block = utils.block;
    var argumentIds = block.argumentIds_;
    var procCode = block.procCode_;

    //We call the custom block with it's values.
    //This is a json object just because it might be easier to deal with.
    var valuesCodeContent = "";
    argumentIds.forEach((argId) => {
      var argumentCode = utils.getInput(argId, null);

      if (!argumentCode) {
        return;
      }

      valuesCodeContent += `${JSON.stringify(argId)}: (${argumentCode}),`;
    });

    var code = "";
    var valuesCode = "{" + valuesCodeContent + "}";

    code += `await sprite.callCustom(`;
    code += `${JSON.stringify(procCode)}, `;
    code += `${valuesCode}, `;
    code += `thread`;
    code += `);`;

    return code;
  },
});
