
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
    var commentText = block.getCommentText();
    if (commentText) {
        var json = {};
        json.text = commentText;
        if (typeof block.comment == 'object') {
            json.id = block.comment.id;
            json.pinned = block.comment.isVisible();
            var hw = null;
            if (block.comment instanceof Blockly.ScratchBlockComment) {
                hw = block.comment.getHeightWidth();
            } else {
                hw = block.comment.getBubbleSize();
            }
            json.width = hw.width;
            json.height = hw.height;
            var xy = block.comment.getXY();
            json.x = Math.round(block.workspace.RTL ? block.workspace.getWidth() - xy.x - hw.width : xy.x);
            json.y = Math.round(xy.y);
            json.minimized = block.comment.isMinimized();
        }
        return json;
    }
}

module.exports = {
    commentsToJSON,
    commentToJSON,
    commentToJSONWithPosition,
    blockCommentToJSON
}