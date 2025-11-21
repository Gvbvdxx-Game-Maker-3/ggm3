var previous_DataCategory = Blockly.DataCategory;
Blockly.DataCategory = function (workspace) {
  var variableModelList = workspace.getVariablesOfType("");
  variableModelList.sort(Blockly.VariableModel.compareByName);
  var xmlList = [];

  Blockly.DataCategory.addCreateButton(xmlList, workspace, "VARIABLE");

  for (var i = 0; i < variableModelList.length; i++) {
    Blockly.DataCategory.addDataVariable(xmlList, variableModelList[i]);
  }

  if (variableModelList.length > 0) {
    xmlList[xmlList.length - 1].setAttribute("gap", 24);
    var firstVariable = variableModelList[0];

    Blockly.DataCategory.addSetVariableTo(xmlList, firstVariable);
    Blockly.DataCategory.addChangeVariableBy(xmlList, firstVariable);
    //Blockly.DataCategory.addShowVariable(xmlList, firstVariable);
    //Blockly.DataCategory.addHideVariable(xmlList, firstVariable);
  }

  return xmlList;
};

Blockly.DataCategory.addCreateButton = previous_DataCategory.addCreateButton;
Blockly.DataCategory.addDataVariable = previous_DataCategory.addDataVariable;
Blockly.DataCategory.addSetVariableTo = previous_DataCategory.addSetVariableTo;
Blockly.DataCategory.addChangeVariableBy =
  previous_DataCategory.addChangeVariableBy;
Blockly.DataCategory.addBlock = previous_DataCategory.addBlock;
Blockly.DataCategory.createValue = previous_DataCategory.createValue;
