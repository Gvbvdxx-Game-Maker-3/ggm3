
function domToJSON(dom) {
    //Rather then us try to make manual implementations for each advanced block,
    // we can just convert the dom into a json object.

    var json = {};
    var attributeNames = dom.getAttributeNames();
    var children = Array.from(dom.children);

    json.tag = dom.tagName;

    if (attributeNames.length > 0) {
        json.attr = {};
        for (var name of attributeNames) {
            json.attr[name] = dom.getAttribute(name);
        }
    }

    if (children.length > 0) {
        json.children = [];
        for (var child of children) {
            json.children.push(domToJSON(child));
        }
    } else if (dom.textContent) {
        json.text = dom.textContent;
    }

    return json;
}

function JSONToDom(json) {
    var tag = json.tag || json.tagName;
    var dom = document.createElement(tag || "");

    var attr = json.attributes || json.attr;
    if (attr) {
        for (var name in attr) {
            dom.setAttribute(name, attr[name]);
        }
    }

    var children = json.children;
    if (children) {
        for (var childJSON of children) {
            var childDom = JSONToDom(childJSON);
            dom.appendChild(childDom);
        }
    } else if (json.text || json.textContent) {
        dom.textContent = json.text || json.textContent;
    }

    return dom;
}

module.exports = {
    domToJSON,
    JSONToDom
};