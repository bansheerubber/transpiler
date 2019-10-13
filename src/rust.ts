import * as child_process from "child_process"
import * as fs from "fs"

// handles compiling rust to webassembly/putting output into /out directory
export default class Rust {
	public static compile(projectDirectory: string, outputDirectory: string): void {
		console.log("\nRust -> Webassembly...")
		let object = Object.assign({}, process.env)
		object.Path = object.Path.concat()
		
		child_process.spawnSync("wasm-pack", ["build", projectDirectory], {
			cwd: process.cwd(),
			env: object,
			stdio: "inherit",
		})

		if(!fs.existsSync(`${outputDirectory}/rust/`)) {
			fs.mkdirSync(`${outputDirectory}/rust`)
		}

		// copy files from project directory to output directory
		let files = fs.readdirSync(`${projectDirectory}/pkg/`)
		for(let file of files) {
			fs.copyFileSync(`${projectDirectory}/pkg/${file}`, `${outputDirectory}/rust/${file}`)
		}

		console.log("")
	}
}