module.exports = [
  {
    element: "div",
    className: "addSpriteButton greyButtonStyle",
    gid: "addSpriteButton",
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
    gid: "spriteAddMenu",
    className: "spriteAddMenu",
    hidden: true,
    children: [],
  },
];
