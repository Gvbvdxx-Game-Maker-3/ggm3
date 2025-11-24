module.exports = [
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Name:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        gid: "spriteNameInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "X:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteXPosInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Y:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteYPosInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Direction:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteDirectionInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Size:",
      },
      {
        element: "input",
        className: "selectedSpriteInput",
        value: "Sprite",
        type: "number",
        gid: "spriteSizeInput",
      },
    ],
  },
  {
    element: "div",
    className: "spriteInputContainer",
    style: {
      display: "flex",
      flexDirection: "column",
    },
    children: [
      {
        element: "span",
        className: "selectedSpriteLabel",
        textContent: "Hidden:",
      },
      {
        element: "input",
        type: "checkbox",
        gid: "spriteHiddenInput",
      },
    ],
  },
];
