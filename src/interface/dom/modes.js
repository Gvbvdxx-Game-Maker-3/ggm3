module.exports = [
  {
    element: "div",
    className: "modeTabs",
    gid: "modeTabs"
  },

  {
    element: "div",
    className: "modeDivContainer",
    gid: "libraryMode",
    hidden: true,
    children: [
      {
        element: "div",
        className: "spritesContainer",
        gid: "libraryContainer",
        children: [],
      },
      ...require("./add-library-buttons.js"),
    ],
  },

  {
    element: "div",
    gid: "spritesMode",
    className: "modeDivContainer",
    hidden: true,
    children: [
      {
        element: "div",
        className: "spritesContainer",
        gid: "spritesContainer",
        children: [],
      },
      ...require("./add-sprite-buttons.js"),
    ],
  },
];
