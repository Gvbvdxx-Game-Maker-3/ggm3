
var elements = require("../../gp2/elements.js");
var AElement = require("../../gp2/aelement.js");
var engine = require("../curengine.js");

var libraryCostumesHeaderContainer = elements.getById("libraryCostumesHeaderContainer");
var libraryCostumesSelectorContainer = elements.getById("libraryCostumesSelectorContainer");

function createLibraryHeader() {
elements.setInnerJSON(libraryCostumesHeaderContainer, [
    {
      element: "button",
      className: "greyButtonStyle",
      textContent: "Import Library Costume",
      style: {
        marginRight: "2px",
      },
      eventListeners: [
        {
          event: "click",
          func: function () {
            var input = document.createElement("input");
            input.type = "file";
            input.accept = ".webp, .png, .bmp, .svg, .jpg, .jpeg";
            input.multiple = true;
            input.onchange = async function () {
              if (input.files[0]) {
                var p = [];
                for (var _file of input.files) {
                  function load(file) {
                    return new Promise((resolve) => {
                      var reader = new FileReader();
                      reader.onload = async function () {
                        input.value = "";
                        input.remove();

                        try {
                          var costume = await spr.addCostume(reader.result);
                          costume.mimeType = file.type;
                          costume.name = file.name
                            .split(".")
                            .slice(0, file.name.split(".").length - 1)
                            .join(".")
                            .trim();
                          spr.ensureUniqueCostumeNames();
                          resolve();
                          reloadCostumes(spr);
                          deps.markAsDirty();
                        } catch (e) {
                          window.alert(e);
                        }
                      };
                      reader.readAsDataURL(file);
                    });
                  }
                  p.push(load(_file));
                }
                Promise.all(p).then(() => {
                  reloadTabCallback(spr);
                });
              } else {
                input.value = "";
                input.remove();
              }
            };
            input.click();
          },
        },
      ],
    },
  ]);
}

function reloadCostumes(lib) {

}

module.exports = lib;