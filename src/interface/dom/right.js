module.exports = {
  element: "div",
  className: "rightPanel",
  children: [
    {
      element: "div",
      className: "rightPanelContent",
      children: [
        {
          element: "div",
          className: "projectContainer",
          gid: "projectContainer",
          children: [
            {
              element: "div",
              className: "projectControls",
              gid: "projectControls",
            },
            {
              element: "canvas",
              gid: "projectCanvas",
              className: "projectCanvas",
            },
          ],
        },
        {
          element: "span",
          className: "projectMouseCoordinates",
          gid: "projectMouseCoordinates",
        },
        ...require("./modes.js"),
      ],
    },
  ],
};
