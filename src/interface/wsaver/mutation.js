
function mutationToJSON(dom) {
    //Rather then us try to make manual implementations for each advanced block,
    // we can just convert the dom into a json object.
    var json = {};
    var attributeNames = dom.getAttributeNames();
    var children = Array.from(dom.children);

    json.attributes = {};
    for (var name of attributeNames) {
        json.attributes[name] = dom.getAttribute(name);
    }

    json.tagName = dom.tagName;
    if (children.length > 0) {
        json.children = [];
        for (var child of children) {
            json.children.push(mutationToJSON(child));
        }
    } else {
        json.textContent = dom.textContent;
    }

    return json;
}

module.exports = {
    mutationToJSON
};