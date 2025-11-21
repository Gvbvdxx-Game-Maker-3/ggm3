Blockly.Blocks['looks_hidden'] = {
    init: function() {
      this.jsonInit({
        "message0": "Hidden?",
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "output_boolean"]
      });
    }
  };

  Blockly.Blocks['looks_visible'] = {
    init: function() {
      this.jsonInit({
        "message0": "Visible?",
        "category": Blockly.Categories.looks,
        "extensions": ["colours_looks", "output_boolean"]
      });
    }
  };