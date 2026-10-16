var wjson = require("./wjson");

function loadSpriteEditorData(sprite, workspace) {
    if (!sprite.editorData) { //No data to load.
        return;
    }
    var data = sprite.editorData;
    if (data.xml) {
        //Legacy implementation.
        var dom = Blockly.Xml.textToDom(data.xml);
        Blockly.Xml.domToWorkspace(dom, workspace);
    } else if (data.blocks) {
        //Use the modern JSON implementation.
        wjson.JSONToWorkspace(data.blocks, workspace);
    }
}

function saveSpriteEditorData(sprite, workspace) {
    if (!sprite.editorData) {
        sprite.editorData = {};
    }
    var data = sprite.editorData;
    
    if (data.xml) {
        //Remove the XML property since we're converting
        // it to the modern format.
        data.xml = "";
        delete data.xml;
    }

    var workspaceJson = wjson.workspaceToJSON(workspace);
    data.blocks = workspaceJson;
}

function copySpriteEditorData(sourceSprite, targetSprite) {
    targetSprite.editorData = JSON.parse(JSON.stringify(sourceSprite.editorData || {}));
}

module.exports = {
    loadSpriteEditorData,
    saveSpriteEditorData,
    copySpriteEditorData
};