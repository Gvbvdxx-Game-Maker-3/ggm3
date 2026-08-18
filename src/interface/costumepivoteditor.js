var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");

var costumesInPivotContainer = elements.getGPId("costumesInPivotContainer");
var pivotEditorMenuBar = elements.getGPId("pivotEditorMenuBar");
var pivotEditorXInput = elements.getGPId("pivotEditorXInput");
var pivotEditorYInput = elements.getGPId("pivotEditorYInput");
var pivotEditorZoomInput = elements.getGPId("pivotEditorZoomInput");

var pivotEditorContainer = elements.getGPId("pivotEditorContainer");
var pivotEditorImageContainer = elements.getGPId("pivotEditorImageContainer");
var pivotEditorImage = elements.getGPId("pivotEditorImage");
var pivotEditorDot = elements.getGPId("pivotEditorDot");

var centerImagePivotEditor = elements.getGPId("centerImagePivotEditor");

var deps = {
  markAsDirty: () => {},
};

var tempImg = null;

function getMousePosition(event, onElement, size) {
  var client = onElement.getBoundingClientRect();

  var relativeX = event.x - client.x;
  var relativeY = event.y - client.y;

  if (size) {
    var scaleX = client.width / size[0];
    var realX = relativeX * scaleX;

    var scaleY = client.height / size[1];
    var realY = relativeY * scaleY;
  } else {
    var realX = relativeX;
    var realY = relativeY;
  }
  if (size) {
    if (realX < 0) {
      realX = 0;
    }
    if (realY < 0) {
      realY = 0;
    }
    if (realX > size[0]) {
      realX = size[0];
    }
    if (realY > size[1]) {
      realY = size[1];
    }
  }

  var pos = {
    x: realX,
    y: realY,
  };
  return pos;
}

function reloadCostumes(spr, reloadTabCallback = function () {}) {
  if (spr.costumes.length < 1) {
    pivotEditorMenuBar.hidden = true;
    pivotEditorContainer.hidden = true;
    elements.setInnerJSON(costumesInPivotContainer, [
      {
        element: "span",
        textContent: "This sprite has no costumes.",
        style: {
          fontWeight: "bold",
          textDecoration: "underline",
        },
      },
    ]);
  } else {
    pivotEditorMenuBar.hidden = false;
    pivotEditorContainer.hidden = false;
    var selectedCostume = 0;
    function updateList() {
      var previousScrollTop = costumesInPivotContainer.scrollTop;
      var previousScrollLeft = costumesInPivotContainer.scrollLeft;
      elements.setInnerJSON(
        costumesInPivotContainer,
        spr.costumes.map((costume, i) => {
          return {
            element: "div",
            className: "pivotCostumeButton",
            GPWhenCreated: function (elm) {
              if (i == selectedCostume) {
                elm.setAttribute("selected", "");
              }
            },
            eventListeners: [
              {
                event: "click",
                func: function () {
                  selectedCostume = i;
                  updateList();
                  updateEditor();
                },
              },
            ],
            children: [
              {
                element: "img",
                src: costume.getSrc(),
                style: {
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                },
              },
              {
                element: "div",
                style: {
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "3px",
                },
                children: [
                  {
                    element: "img",
                    hidden: !costume.linkID, //Only show if this is linked to a library.
                    className: "libraryLinkIcon",
                    src: "icons/library.svg",
                  },
                  {
                    element: "span",
                    textContent: costume.name,
                  },
                ],
              },
            ],
          };
        }),
      );
      costumesInPivotContainer.scrollTop = previousScrollTop;
      costumesInPivotContainer.scrollLeft = previousScrollLeft;
    }

    updateList();

    function updateEditor() {
      var costume = spr.costumes[selectedCostume];
      if (!costume) {
        pivotEditorImage.src = "";
        return;
      }
      if (tempImg) {
        tempImg.src = "";
        tempImg.remove();
      }
      tempImg = document.createElement("img");
      tempImg.src = costume.getSrc();
      pivotEditorImage.src = costume.getSrc();
      var zoomScale = 1;
      function updateSize() {
        zoomScale = pivotEditorZoomInput.value / 100;
        pivotEditorImageContainer.style.left = `calc(50% - ${costume.rotationCenterX * zoomScale}px)`;
        pivotEditorImageContainer.style.top = `calc(50% - ${costume.rotationCenterY * zoomScale}px)`;
        pivotEditorDot.style.left = `${costume.rotationCenterX * zoomScale}px`;
        pivotEditorDot.style.top = `${costume.rotationCenterY * zoomScale}px`;
        //pivotEditorImageContainer.style.scale = pivotEditorZoomInput.value / 100;
        pivotEditorImage.style.width = `${zoomScale * tempImg.width}px`;
        pivotEditorImage.style.height = `${zoomScale * tempImg.height}px`;
        pivotEditorImageContainer.style.width = pivotEditorImage.style.width;
        pivotEditorImageContainer.style.height = pivotEditorImage.style.height;

        pivotEditorXInput.value = costume.rotationCenterX.toFixed(2);
        pivotEditorYInput.value = costume.rotationCenterY.toFixed(2);
      }
      updateSize();
      pivotEditorZoomInput.oninput = function () {
        updateSize();
      };
      pivotEditorXInput.onchange = function () {
        costume.rotationCenterX = +pivotEditorXInput.value || 0;
        updateSize();
        deps.markAsDirty();
      };
      pivotEditorYInput.onchange = function () {
        costume.rotationCenterY = +pivotEditorYInput.value || 0;
        updateSize();
        deps.markAsDirty();
      };

      pivotEditorContainer.onclick = function (event) {
        var pos = getMousePosition(event, pivotEditorImage);
        costume.rotationCenterX = pos.x / zoomScale;
        costume.rotationCenterY = pos.y / zoomScale;
        updateSize();
        deps.markAsDirty();
      };
      var m = false;
      pivotEditorContainer.onmousedown = function (event) {
        m = true;
        event.preventDefault();
      };
      pivotEditorContainer.onmouseup = function (event) {
        m = false;
        event.preventDefault();
      };
      pivotEditorContainer.onmousemove = function (event) {
        if (!m) {
          return;
        }
        var pos = getMousePosition(event, pivotEditorImage);
        costume.rotationCenterX = pos.x / zoomScale;
        costume.rotationCenterY = pos.y / zoomScale;
        pivotEditorDot.style.left = `${costume.rotationCenterX * zoomScale}px`;
        pivotEditorDot.style.top = `${costume.rotationCenterY * zoomScale}px`;
        deps.markAsDirty();
      };

      centerImagePivotEditor.onclick = function (e) {
        costume.rotationCenterX = tempImg.width / 2;
        costume.rotationCenterY = tempImg.height / 2;
        updateSize();
        deps.markAsDirty();
      };
    }

    updateEditor();
  }
}

module.exports = {
  reloadCostumes,
  deps,
};
