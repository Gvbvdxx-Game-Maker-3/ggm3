
function variableFieldToJSON(field) {
    var id = field.getValue();
    if (id == null) {
        field.initModel();
        id = field.getValue();
    }

    var variable = field.getVariable();
    if (!variable) {
        throw Error('Tried to serialize a variable field with no variable.');
    }

    var json = {};

    json.variable = true;
    json.vname = variable.name;
    json.name = field.name;
    json.id = variable.getId();
    json.type = variable.type;

    return json;
}

function fieldToJSON(field) {
    var canSerialize = field.name && field.SERIALIZABLE;
    if (!canSerialize) {
        return;
    }

    if (field.referencesVariables()) {
        return variableFieldToJSON(field);
    }

    var json = {};

    json.value = field.getValue();
    json.name = field.name;

    return json;
}

function fieldsToJSON(block) {
    var array = [];
    for (var input of block.inputList) {
        for (var field of input.fieldRow) {
            var f = fieldToJSON(field);
            if (f) {
                array.push(f);
            }
        }
    }
    return array;
}

function JSONToField(block, fieldJson) {
    var field = block.getField(fieldJson.name);
    if (!field) {
        return;
    }

    var workspace = block.workspace;
    var text = fieldJson.value;

}

module.exports = {
    fieldsToJSON,
    fieldToJSON,
    variableFieldToJSON,
    JSONToField
};