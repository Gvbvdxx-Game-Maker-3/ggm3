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
          className: "projectControls",
          gid: "projectControls",
        },
        {
          element: "canvas",
          gid: "projectCanvas",
          className: "projectCanvas",
        },
        {
          element: "span",
          className: "projectMouseCoordinates",
          gid: "projectMouseCoordinates",
        },
        {
          element: "div",
          className: "selectedSpriteContainer",
          children: [
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
                flexDirection: "column"
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
          ],
        },
        {
          element: "div",
          className: "spritesContainer",
          gid: "spritesContainer",
          children: [],
        },
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
      ],
    },
  ],
};
