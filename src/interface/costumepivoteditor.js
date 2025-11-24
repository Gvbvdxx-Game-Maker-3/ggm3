var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");

var costumesInPivotContainer = elements.getGPId("costumesInPivotContainer");

function reloadCostumes(spr, reloadTabCallback = function () {}) {
  if (spr.costumes.length < 1) {
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
    var selectedCostume = 0;
    function updateList() {
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
                },
              },
            ],
            children: [
              {
                element: "img",
                src: costume.dataURL,
                style: {
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                },
              },
              {
                element: "span",
                textContent: costume.name,
              },
            ],
          };
        }),
      );
    }

    updateList();
  }
}

module.exports = {
  reloadCostumes,
};
