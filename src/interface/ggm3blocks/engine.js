Blockly.Blocks["engine_framerate_to"] = {
  init: function () {
    this.jsonInit({
      message0: "set game framerate to %1",
      args0: [
        {
          type: "input_value",
          name: "FPS",
        },
      ],
      extensions: ["shape_statement"],
      colour: "#77a1b5",
    });
  },
};

Blockly.Blocks["engine_framerate"] = {
  init: function () {
    this.jsonInit({
      message0: "game framerate",
      args0: [],
      extensions: ["output_number"],
      colour: "#77a1b5",
    });
  },
};
