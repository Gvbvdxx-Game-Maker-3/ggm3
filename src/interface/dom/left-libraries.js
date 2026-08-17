module.exports = {
  element: "div",
  className: "leftPanel",
  gid: "librariesLeftPanel",
  children: [
    {
      element: "div",
      className: "tabArea",
      gid: "tabLibrariesArea",
    },
    {
      element: "div",
      className: "tabWindow",
      gid: "tabLibrariesWindow",
      children: [

        {
          element: "div",
          className: "costumesContainer",
          gid: "libraryCostumesContainer",
          children: [
            {
              element: "div",
              className: "costumesHeaderContainer",
              gid: "libraryCostumesHeaderContainer",
            },
            {
              element: "div",
              className: "costumesSelectorContainer",
              gid: "libraryCostumesSelectorContainer",
            },
          ],
        },

        {
          element: "div",
          className: "soundsContainer",
          gid: "librarySoundsContainer",
          children: [
            {
              element: "div",
              className: "soundsHeaderContainer",
              gid: "librarySoundsHeaderContainer",
            },
            {
              element: "div",
              className: "soundsSelectorContainer",
              gid: "librarySoundsSelectorContainer",
            },
          ],
        },
      ],
    },
  ],
};
