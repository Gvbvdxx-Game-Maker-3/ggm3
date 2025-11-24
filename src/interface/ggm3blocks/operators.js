Blockly.Blocks["operator_sign"] = {
  init: function () {
    this.jsonInit({
      message0: "Sign of %1",
      args0: [
        {
          "type": "input_value",
          "name": "NUM"
        },
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  },
};

Blockly.Blocks["operator_fixed"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to fixed %2",
      args0: [
        {
          "type": "input_value",
          "name": "NUM"
        },
        {
          "type": "input_value",
          "name": "DECIMALS"
        },
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  },
};

Blockly.Blocks["operator_true"] = {
  init: function () {
    this.jsonInit({
      message0: "true",
      args0: [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  },
};

Blockly.Blocks["operator_false"] = {
  init: function () {
    this.jsonInit({
      message0: "false",
      args0: [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_boolean"]
    });
  },
};

Blockly.Blocks["operator_nan"] = {
  init: function () {
    this.jsonInit({
      message0: "NaN",
      args0: [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  },
};


Blockly.Blocks["operator_null"] = {
  init: function () {
    this.jsonInit({
      message0: "null",
      args0: [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  },
};

Blockly.Blocks["operator_infinity"] = {
  init: function () {
    this.jsonInit({
      message0: "Infinity",
      args0: [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  },
};

Blockly.Blocks["operator_empty_string"] = {
  init: function () {
    this.jsonInit({
      message0: "empty string",
      args0: [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  },
};

Blockly.Blocks["operator_newline"] = {
  init: function () {
    this.jsonInit({
      message0: "New line character",
      args0: [],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  },
};

Blockly.Blocks["operator_tostring"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to string",
      args0: [
		{
          "type": "input_value",
          "name": "VALUE"
        }
	  ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  },
};
Blockly.Blocks["operator_tonumber"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to number",
      args0: [
		{
          "type": "input_value",
          "name": "VALUE"
        }
	  ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  },
};
Blockly.Blocks["operator_toboolean"] = {
  init: function () {
    this.jsonInit({
      message0: "%1 to boolean",
      args0: [
		{
          "type": "input_value",
          "name": "VALUE"
        }
	  ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  },
};

Blockly.Blocks["operator_outputif"] = {
  init: function () {
    this.jsonInit({
      message0: "If %1 output %2 else output %3",
      args0: [
		{
          "type": "input_value",
          "name": "CONDITION",
			"check": "Boolean"
        },
		  {
          "type": "input_value",
          "name": "PASS_OUTPUT"
        },
		 {
          "type": "input_value",
          "name": "FAIL_OUTPUT"
        }
	  ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_string"]
    });
  },
};

Blockly.Blocks['operator_mathop'] = {
  /**
   * Block for "advanced" math ops on a number.
   * @this Blockly.Block
   */
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.OPERATORS_MATHOP,
      "args0": [
        {
          "type": "field_dropdown",
          "name": "OPERATOR",
          "options": [
            [Blockly.Msg.OPERATORS_MATHOP_ABS, 'abs'],
            [Blockly.Msg.OPERATORS_MATHOP_FLOOR, 'floor'],
            [Blockly.Msg.OPERATORS_MATHOP_CEILING, 'ceiling'],
            [Blockly.Msg.OPERATORS_MATHOP_SQRT, 'sqrt'],
            [Blockly.Msg.OPERATORS_MATHOP_SIN, 'sin'],
            [Blockly.Msg.OPERATORS_MATHOP_COS, 'cos'],
            [Blockly.Msg.OPERATORS_MATHOP_TAN, 'tan'],
            [Blockly.Msg.OPERATORS_MATHOP_ASIN, 'asin'],
            [Blockly.Msg.OPERATORS_MATHOP_ACOS, 'acos'],
            [Blockly.Msg.OPERATORS_MATHOP_ATAN, 'atan'],
            [Blockly.Msg.OPERATORS_MATHOP_LN, 'ln'],
            [Blockly.Msg.OPERATORS_MATHOP_LOG, 'log'],
            [Blockly.Msg.OPERATORS_MATHOP_EEXP, 'e ^'],
            [Blockly.Msg.OPERATORS_MATHOP_10EXP, '10 ^']
          ]
        },
        {
          "type": "input_value",
          "name": "NUM"
        }
      ],
      "category": Blockly.Categories.operators,
      "extensions": ["colours_operators", "output_number"]
    });
  }
};