var elements = require("../../gp2/elements.js");

// Menubar JSON descriptor with builtin API to add dropdown menus at runtime.
module.exports = {
  element: "div",
  className: "menuBar",
  gid: "menuBar",
  children: [
    {
      element: "div",
      className: "menuBarItemLogo",
      children: [
        {
          element: "img",
          src: "logo/logo.png",
          className: "menuBarItemLogoImg",
        },
      ],
    },
    {
      element: "div",
      className: "menuBarMenus",
      gid: "menuBarMenus",
    },
  ],
};
