Blockly.Blocks['sensing_keypressed'] = {
  init: function() {
    this.jsonInit({
      "message0": Blockly.Msg.SENSING_KEYPRESSED,
      "args0": [
        {
          "type": "input_value",
          "name": "KEY_OPTION"
        }
      ],
      "category": Blockly.Categories.sensing,
      "extensions": ["colours_sensing", "output_boolean"]
    });
  }
};

Blockly.Blocks['sensing_keyoptions'] = {
  init: function() {
    this.jsonInit({
      "message0": "%1",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "KEY_OPTION",
          "options": [
            ['space', 'space-bar'],
            ['up arrow', 'up-arrow'],
            ['down arrow', 'down-arrow'],
            ['left arrow', 'right-arrow'],
            ['right arrow', 'left-arrow'],
			['enter', 'enter'],
			['shift', 'shift'],
			["[", "["],
			["\\", "\\"],
			["=", "="],
			["-", "-"],
			["`", "`"],
			[";", ";"],
			["'", "'"],
			[".", "."],
			["/", "/"],
			[",", ","],
            ['a', 'a'],
            ['b', 'b'],
            ['c', 'c'],
            ['d', 'd'],
            ['e', 'e'],
            ['f', 'f'],
            ['g', 'g'],
            ['h', 'h'],
            ['i', 'i'],
            ['j', 'j'],
            ['k', 'k'],
            ['l', 'l'],
            ['m', 'm'],
            ['n', 'n'],
            ['o', 'o'],
            ['p', 'p'],
            ['q', 'q'],
            ['r', 'r'],
            ['s', 's'],
            ['t', 't'],
            ['u', 'u'],
            ['v', 'v'],
            ['w', 'w'],
            ['x', 'x'],
            ['y', 'y'],
            ['z', 'z'],
            ['0', '0'],
            ['1', '1'],
            ['2', '2'],
            ['3', '3'],
            ['4', '4'],
            ['5', '5'],
            ['6', '6'],
            ['7', '7'],
            ['8', '8'],
            ['9', '9'],
          ]
        }
      ],
      "extensions": ["colours_sensing", "output_string"]
    });
  }
};