var EventEmitter = require("eventemitter3");
var ExportOptionsEvents = require("../events.js");

class HTML5ExportOption extends EventEmitter {

    static getInformation() {
        return {
            icon: "icons/html.svg",
            name: "HTML5",
            description: "Export your game as an HTML5 package that can be hosted on the web or run locally.",
            icon: "icons/html5.svg",
            options: [
                {
                    name: "Singular HTML file",
                    description: "Export the game as a single HTML file that includes all assets encoded as base64 data URIs. This makes it easy to share and run the game, but may increase the file size, load time and cause stability issues on some devices.",
                    type: "boolean",
                    default: true,
                },
            ],
        };
    }

    constructor(generatedJS, options) {
        super();

        this.generatedJS = generatedJS;
        this.options = options;
        this.generate();
    }

    generate() {
        
    }
}