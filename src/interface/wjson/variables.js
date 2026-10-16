
function variablesToJSON(variableList) {
    var array = [];
    for (var variable of variableList) {
        var json = {};
        json.name = variable.name;
        json.id = variable.getId();
        json.type = variable.type;
        json.isLocal = variable.isLocal;
        json.isCloud = variable.isCloud;

        array.push(json);
    }

    return array;
}

function JSONToVariables(jsonArray, workspace) {
    for (var json of jsonArray) {
        var name = json.name;
        var id = json.id;
        var type = json.type;
        var isLocal = json.isLocal;
        var isCloud = json.isCloud;
        

        workspace.createVariable(name, type, id, isLocal, isCloud);
    }
}

module.exports = {
    variablesToJSON,
    JSONToVariables
};