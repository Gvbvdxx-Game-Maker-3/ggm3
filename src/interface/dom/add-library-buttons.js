module.exports = [
  {
    element: "div",
    className: "addSpriteButton greyButtonStyle",
    gid: "addLibraryButton",
    children: [
      {
        element: "img",
        src: "/icons/add.svg",
        style: {
          width: "32px",
          height: "32px",
        },
      },
    ],
  },
  {
    element: "div",
    gid: "libraryAddMenu",
    className: "spriteAddMenu",
    hidden: true,
    children: [],
  },
];
