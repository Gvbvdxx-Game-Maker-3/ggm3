var { addAppMenu } = require("./dropdown-menus.js");

addAppMenu(
  "edit",
  [
    {
      element: "img",
      src: "icons/edit.svg",
    },
    {
      element: "span",
      textContent: "Edit",
    },
  ],
  [
    {
      label: "Edit game settings",
      icon: "icons/controller.svg",
      action: async function () {},
    },
  ],
);
