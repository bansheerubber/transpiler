import * as fs from "fs";
import ObfuscationMap from "./obfuscationMap";

export default class ImportFixer {
	public static async readFile(fileName: string, directory: string, inDirectory: string, outDirectory: string): Promise<void> {
		fs.readFile(fileName, async (error, buffer) => {
			let output = buffer.toString()
			let lines = output.split("\r\n")

			for(let line of lines) {
				if(line.match(/const \w+ = require\("\.+\/.+(?=\"\))/)) {
					let file = `${directory.replace(outDirectory, inDirectory)}/${line.match(/(?<=").+(?=")/)}.ts`

					if(fs.existsSync(file)) {
						let defaultExport = await this.getDefaultExportName(file)

						if(defaultExport) {
							let replaceWord = line.match(/(?<=const ).+(?= \=)/g)[0]

							// check to see how many times the word appears in the file
							if(output.match(new RegExp(replaceWord, "g")).length > 1) {
								output = output.replace(new RegExp(replaceWord, "g"), ObfuscationMap.getObfuscatedClassString(defaultExport))
							}
							else {
								output = output.replace(line, "") // if we only have 1 instnace of this import name, then remove the import because we don't need it
							}
						}
					}
				}
			}

			this.writeToFile(fileName, output)
		})
	}

	public static writeToFile(fileName: string, content: string): void {
		fs.writeFile(fileName, content, (error) => {
			if(error) {
				throw error
			}
		})
	}

	public static getDefaultExportName(fileName: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			fs.readFile(fileName, (error, buffer) => {
				let lines = buffer.toString().split("\n")
				for(let line of lines) {
					if(line.indexOf("export default") != -1) {
						// resolve(line.match(/(?<=exports\.default = ).+(?=;)/g)[0])
						let exportMatch = line.match(/(?<=export default).+/g)[0].trim()
						let exportMatch2 = exportMatch.replace(/(class|abstract|function|interface|async|(\(.+\)))/g, "").match(/\w+/g)

						if(exportMatch2) {
							resolve(exportMatch2[0])
						}
						else {
							resolve(undefined)
						}
					}
				}
				resolve(undefined)
			})
		})
	}

	public static async readAllFiles(directory: string, inDirectory: string, outDirectory: string): Promise<void> {
		fs.readdir(`${directory}/`, (error, files) => {
			for(let file of files) {
				if(file.indexOf(".js") != -1) {
					this.readFile(`${directory}/${file}`, directory, inDirectory, outDirectory)
				}
				else if(file.indexOf(".") == -1) {
					this.readAllFiles(`${directory}/${file}`, inDirectory, outDirectory)
				}
			}
		})
	}
}