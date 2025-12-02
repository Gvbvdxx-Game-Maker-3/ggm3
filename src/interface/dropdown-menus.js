var elements = require("../gp2/elements.js");
var AElement = require("../gp2/aelement.js");

module.exports = {
  addAppMenu: function (title, items) {
    var menuId = "menu-" + title.toLowerCase().replace(/\s+/g, "-");
    var dropdownId = menuId + "-dropdown";

    var menuJSON = [
      {
        element: "div",
        className: "menuBarItem menuParent",
        gid: menuId,
        children: [
          { element: "div", className: "menuBarItemLabel", textContent: title },
          {
            element: "div",
            className: "menuDropdown",
            gid: dropdownId,
            hidden: true,
            children: items.map(function (it, idx) {
              var child = {
                element: "div",
                className: "menuDropdownItem",
                gid: dropdownId + "-item-" + idx,
              };
              if (it.icon) {
                child.children = [
                  { element: "img", src: it.icon, className: "menuIcon" },
                  {
                    element: "div",
                    className: "menuDropdownItemLabel",
                    textContent: it.label,
                  },
                ];
              } else {
                child.textContent = it.label;
              }
              return child;
            }),
          },
        ],
      },
    ];

    var newEls = elements.createElementsFromJSON(menuJSON);
    var menusContainer = elements.getGPId("menuBarMenus");
    for (var ne of newEls) menusContainer.append(ne);

    var parent = elements.getGPId(menuId);
    var dropdown = elements.getGPId(dropdownId);

    function closeDropdown() {
      if (dropdown) dropdown.hidden = true;
      parent.classList.remove("open");
    }

    parent.addEventListener("click", function (ev) {
      ev.stopPropagation();
      var wasHidden = dropdown.hidden;
      document.querySelectorAll(".menuDropdown").forEach(function (d) {
        d.hidden = true;
        var p = d.parentElement;
        if (p) p.classList.remove("open");
      });
      dropdown.hidden = !wasHidden;
      if (!dropdown.hidden) parent.classList.add("open");
      else parent.classList.remove("open");
    });

    items.forEach(function (it, idx) {
      var itemEl = elements.getGPId(dropdownId + "-item-" + idx);
      if (!itemEl) return;
      itemEl.addEventListener("click", function (ev) {
        ev.stopPropagation();
        closeDropdown();
        try {
          if (typeof it.action === "function") it.action();
        } catch (e) {
          console.error("Menu action error:", e);
        }
      });
    });

    document.addEventListener("click", function () {
      closeDropdown();
    });

    return { id: menuId, dropdownId: dropdownId };
  },
};
