var EventEmitter = require("eventemitter3");
var ExportOptionsEvents = require("../events.js");
var { ExportMainGenerator } = require("../../file");
var jszip = require("jszip");

class PlaceholderExportOption extends EventEmitter {
  static getInformation() {
    return {
      icon: "icons/controller.svg",
      name: "Placeholder",
      description:
        "Base export option",
      options: [
        {
          name: "Checkbox Option",
          id: "optionid",
          description:
            "Checkbox Description",
          type: "checkbox",
          default: false,
        },
				{
          name: "Text Option",
          id: "optionid2",
          description: "Text Description",
          type: "text",
          default: "Default value",
        },
      ],
    };
  }

  constructor(options) {
    super();
		this.canceled = false;
		this.generate();
  }

  cancel() {
    this.canceled = true;
  }

  async generate() {
    this.canceled = false;

    this.emit(ExportOptionsEvents.COMPLETE, [
      {
        name: "Finished button",
        action: function () {
					window.alert("Finished button clicked");
				},
      },
    ]);
  }
}

module.exports = PlaceholderExportOption;
