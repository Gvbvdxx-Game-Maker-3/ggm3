var { blockToJSON, workspaceToJSON } = require("./blocktojson.js");
var JavascriptTranslation = require("./blocks");
var StarterBlocks = require("./blocks/starters.js");
function getInput(blockJson, name) {
  for (var input of blockJson.inputs) {
    if (input.name == name) {
      console.log(input.block);
      return compileBlockFromJSON(input.block);
    }
  }
  return null;
}
function getField(blockJson, name) {
  for (var field of blockJson.fields) {
    if (field.name == name) {
      return field.value;
    }
  }
  return null;
}

function compileBlockFromJSON(json) {
  if (JavascriptTranslation[json.type]) {
    var output = JavascriptTranslation[json.type](json, {
      getInput,
      getField,
    });
  } else {
    console.warn(
      "Unable to compile block " +
        json.type +
        " because it doesn't exist in the translator."
    );
    return;
  }
  if (json.next) {
    output += compileBlockFromJSON(json.next);
  }
  return output;
}

function compileBlock(block) {
  return compileBlockFromJSON(blockToJSON(block));
}

function isStarterBlock(block) {
  var json = blockToJSON(block);
  return StarterBlocks.indexOf(json.type) !== -1;
}

function compileBlockStartImmediateJSON(json) {
  var json = blockToJSON(block);
  if (StarterBlocks.indexOf(json.type) !== -1) {
    return compileBlockStartImmediate(json.next);
  }
}

module.exports = {
  compileBlock,
  compileBlockStartImmediate,
  isStarterBlock,
};
