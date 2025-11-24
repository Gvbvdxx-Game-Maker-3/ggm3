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
      className: "menuBarItem",
      textContent: "New",
      gid: "newProjectButton"
    },
    {
      element: "div",
      className: "menuBarItem",
      textContent: "Save",
      gid: "saveProjectButton"
    },
    {
      element: "div",
      className: "menuBarItem",
      textContent: "Load",
      gid: "loadProjectButton"
    },
  ],
};
