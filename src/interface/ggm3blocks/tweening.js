var EasingMap = require("../../engine/easingmap.js");

function getEasingOptions () {
    var options = [];

    for (var key of Object.keys(EasingMap)) {
        options.push([key, key]);
    }

    return options;
}

Blockly.Blocks["tween_to_xy"] = {
  init: function () {
    this.jsonInit({
      message0: "tween to x: %1 y: %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_stretch"] = {
  init: function () {
    this.jsonInit({
      message0: "tween stretch to x: %1 y: %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_size"] = {
  init: function () {
    this.jsonInit({
      message0: "tween size to %1 in %2 seconds easing %3",
      args0: [
        {
          type: "input_value",
          name: "VALUE",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_skew"] = {
  init: function () {
    this.jsonInit({
      message0: "tween skew to x: %1 y: %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "X",
        },
        {
          type: "input_value",
          name: "Y",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};

Blockly.Blocks["tween_to_object"] = {
  init: function () {
    this.jsonInit({
      message0: "tween object %1 to values in object %2 in %3 seconds easing %4",
      args0: [
        {
          type: "input_value",
          name: "SOURCE",
        },
        {
          type: "input_value",
          name: "TARGET",
        },
        {
          type: "input_value",
          name: "SECONDS",
        },
        {
          type: "field_dropdown",
          name: "EASING",
          options: getEasingOptions,
        },
      ],
      colour: "#74b62e",
      extensions: ["shape_statement"],
    });
  },
};