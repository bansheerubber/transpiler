import * as fs from "fs"

// copies over all non ts/tsx files into the out directory
export default class FileCopy {
	public static copyFile(fileName: string, directory: string, inDirectory: string, outDirectory: string): void {
		fs.copyFile(fileName, fileName.replace(inDirectory, outDirectory), (error) => {

		})
	}

	public static async copyAllFiles(directory: string, inDirectory: string, outDirectory: string): Promise<void> {
		fs.readdir(`${directory}/`, (error, files) => {
			for(let file of files) {
				if(!file.match(/ts|tsx/g) && file.indexOf(".") != -1) {
					this.copyFile(`${directory}/${file}`, directory, inDirectory, outDirectory)
				}
				else if(file.indexOf(".") == -1) {
					this.copyAllFiles(`${directory}/${file}`, inDirectory, outDirectory)
				}
			}
		})
	}
}