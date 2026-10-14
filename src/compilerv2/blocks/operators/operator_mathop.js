var BlockCompiler = require("../../compiler/compiler.js");
var CBlockType = require("../../compiler/types.js");
var CoreFunctions = require("../../compiler/corefunc.js");

BlockCompiler.defineBlock("operator_mathop", {
  type: CBlockType.OUTPUT,
  func: function (utils) {
    var OPERATOR = utils.getField("OPERATOR", "none");

    var NUM = utils.getInput("NUM", "0");
    var NUM_NUMBER = CoreFunctions.castToNumber(NUM, false);

    switch (OPERATOR) {
      case "abs":
        return `Math.abs(${NUM_NUMBER})`;
      case "floor":
        return `Math.floor(${NUM_NUMBER})`;
      case "ceiling":
        return `Math.ceil(${NUM_NUMBER})`;
      case "sqrt":
        return `Math.sqrt(${NUM_NUMBER})`;
      case "sin":
        return `Math.round(Math.sin((Math.PI * (${NUM_NUMBER})) / 180) * 1e10) / 1e10`;
      case "cos":
        return `Math.round(Math.cos((Math.PI * (${NUM_NUMBER})) / 180) * 1e10) / 1e10`;
      case "tan":
        return `Math.tan(${NUM_NUMBER})`;
      case "asin":
        return `(Math.asin(${NUM_NUMBER}) * 180) / Math.PI`;
      case "acos":
        return `(Math.acos(${NUM_NUMBER}) * 180) / Math.PI`;
      case "atan":
        return `(Math.atan(${NUM_NUMBER}) * 180) / Math.PI`;
      case "ln":
        return `Math.log(${NUM_NUMBER})`;
      case "log":
        return `Math.log(${NUM_NUMBER}) / Math.LN10`;
      case "e ^":
        return `Math.exp(${NUM_NUMBER})`;
      case "10 ^":
        return `Math.pow(10, ${NUM_NUMBER})`;
      case "20 ^":
        return `Math.pow(20, ${NUM_NUMBER})`;
    }
    return `0`;
  },
});
