Blockly.Blocks["operator_sign"] = {
  init: function () {
    this.jsonInit({
      message0: "sign of %1",
      args0: [
        {
          type: "math_number",
          name: "NUM",
        },
      ],
      category: Blockly.Categories.operators,
      extensions: ["colours_operators", "output_number"],
    });
  },
};
