"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
class ImportFixer {
    static async readFile(fileName, directory) {
        fs.readFile(fileName, async (error, buffer) => {
            let lines = buffer.toString().split("\n");
            for (let line of lines) {
                if (line.match(/const \w+ = require\("\.\/.+(?=\"\))/)) {
                    let file = `${directory}/${line.match(/(?<=").+(?=")/)}.js`;
                    let defaultExport = await this.getDefaultExportName(file);
                    console.log(defaultExport);
                }
            }
        });
    }
    static getDefaultExportName(fileName) {
        return new Promise((resolve, reject) => {
            fs.readFile(fileName, (error, buffer) => {
                let lines = buffer.toString().split("\n");
                for (let line of lines) {
                    if (line.indexOf("exports.default = ") != -1) {
                        return line.match(/(?<=exports\.default = ).+(?=;)/g)[0];
                    }
                }
            });
        });
    }
    static async readAllFiles(directory) {
        fs.readdir(`${directory}/`, (error, files) => {
            for (let file of files) {
                if (file.indexOf(".js") != -1) {
                    this.readFile(`${directory}/${file}`, directory);
                }
                else if (file.indexOf(".") == -1) {
                    setTimeout(() => {
                        this.readAllFiles(`${directory}/${file}`);
                    }, 1);
                }
            }
        });
    }
}
exports.default = ImportFixer;
//# sourceMappingURL=importFixer.js.map