var EventEmitter = require("eventemitter3");
var ExportOptionsEvents = require("../events.js");
var { ExportMainGenerator } = require("../../file");
var jszip = require("jszip");

class HTML5ExportOption extends EventEmitter {
  static getInformation() {
    return {
      icon: "icons/html.svg",
      name: "HTML5",
      description:
        "Export your game as an HTML5 package that can be hosted on the web or can run locally.",
      options: [
        {
          name: "Built in assets",
          id: "dataURLs",
          description:
            "Export the game logic with all assets encoded as base64 data URIs. This can severely effect device resources if this is on." +
            "\nNote: If you turn this off, you'll need to run this game on a web server or a browser or web app supporting fetching from file URLs.",
          type: "checkbox",
          default: true,
        },
      ],
    };
  }

  constructor(options) {
    super();

    this.options = options;
    this.canceled = false;
    this.zip = null;
    this.generator = null;
    this.resultZip = null;
    this.generate();
  }

  cancel() {
    this.canceled = true;
    this.zip = null;
    if (this.generator) {
      this.generator.cancel();
      this.generator = null;
    }
    this.resultZip = null;
  }

  async generate() {
    this.canceled = false;
    this.generator = new ExportMainGenerator();
    this.generator.useDataURL = this.options.dataURLs;
    var files = await this.generator.generate();
    if (!files) {
      this.canceled = true;
      this.emit(ExportOptionsEvents.CANCEL_COMPLETE);
      return;
    }

    this.zip = new jszip();
    for (var filename of Object.keys(files)) {
      var data = files[filename];
      if (data !== null) {
        await this.zip.file(filename, data);
      } else {
        await this.zip.folder(filename);
      }
      if (this.canceled) {
        this.emit(ExportOptionsEvents.CANCEL_COMPLETE);
        return;
      }
    }

    this.resultZip = await this.zip.generateAsync({ type: "blob" });
    if (this.canceled) {
      this.emit(ExportOptionsEvents.CANCEL_COMPLETE);
      return;
    }

    this.emit(ExportOptionsEvents.COMPLETE, [
      {
        name: "Download exported game",
        action: this.downloadExportedGame.bind(this),
      },
    ]);
  }

  downloadExportedGame() {
    var result = this.resultZip;
    if (!result) {
      return;
    }
    var objectURL = URL.createObjectURL(result);
    var a = document.createElement("a");
    a.href = objectURL;
    a.download = "game.zip";
    a.click();
  }
}

module.exports = HTML5ExportOption;
