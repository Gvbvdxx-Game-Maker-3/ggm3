
function commentToJSON(comment) {
    var json = {};
    json.text = comment.getText();
    json.id = comment.id;
    if (comment.isMinimized_) {
        json.minimized = true;
    }
    return json;
}

function commentToJSONWithPosition(comment) {
    var json = commentToJSON(comment);
    json.x = Math.round(comment.xy_.x);
    json.y = Math.round(comment.xy_.y);
    json.width = comment.width_;
    json.height = comment.height_;
    return json;
}

function commentsToJSON (workspace) {
    var commentsArray = [];
    var comments = workspace.getTopComments(true).filter(function(topComment) {
        return topComment instanceof Blockly.WorkspaceComment;
    });
    for (var comment of comments) {
        commentsArray.push(commentToJSONWithPosition(comment));
    }
    return commentsArray;
}

function blockCommentToJSON(block) {
    var json = {};
    
}

module.exports = {
    commentsToJSON,
    commentToJSON,
    commentToJSONWithPosition
}