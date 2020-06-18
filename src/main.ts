import * as ts from "typescript";
import Obfuscator from "./obfuscator";
import NewExpressionTransformer from "./newExpressionTransformer";
import ObfuscationMap from "./obfuscationMap";
import ObfuscationRoot from "./structure/obfuscationRoot";
import ImportFixer from "./importFixer";
import * as fs from "fs"
import StringNormalizer from "./stringNormalizer";
import FileCopy from "./fileCopy";

ObfuscationMap.root = new ObfuscationRoot(undefined, "", undefined, true)

// process arguments
let args = process.argv.slice(2)
let obfuscate = true
let inDirectory = args[0]
let rustDirectory = args[1]
let outDirectory = args[2]
let networkFile = args[3]

if(fs.existsSync(inDirectory)) {
	for(let arg of args) {
		// skips obfuscation
		if(arg == "-s") {
			obfuscate = false
		}

		// use unicode obfuscation
		if(arg == "-u") {
			ObfuscationMap.useUnicode = true
		}
	}

	let fileNames = []
	function readDir(directory: string) {
		for(let file of fs.readdirSync(directory)) {
			if(file.indexOf(".") == -1) {
				readDir(`${directory}/${file}`)
			}
			else if(file.match(/.ts|.tsx/)) {
				fileNames.push(`${directory}/${file}`)
			}
		}
	}
	readDir(inDirectory)

	console.log("Transpiler: r24")

	if(obfuscate) {
		console.log("Generating obfuscation tree...")
		let program1 = ts.createProgram(fileNames, {
			target: ts.ScriptTarget.ES2018,
			module: ts.ModuleKind.CommonJS,
			noImplicitAny: true,
			outDir: outDirectory,
			jsx: ts.JsxEmit.React,
		})

		Obfuscator.checker = program1.getTypeChecker()
		program1.emit(undefined, undefined, undefined, false, {
			before: [ObfuscationMap.transformer]
		})
		ObfuscationMap.root.inheritClasses()
		ObfuscationMap.root.processUnfinished()
		// ObfuscationMap.debugPrint()
		console.log(`${ObfuscationMap.root.getCount()} obfuscated names generated`)
		console.log(`${ObfuscationMap.totalLines} lines processed`)
	}

	NewExpressionTransformer.networkFile = networkFile

	let transformers = [NewExpressionTransformer.transformer, StringNormalizer.transformer]
	if(obfuscate) {
		transformers = [NewExpressionTransformer.transformer, Obfuscator.transformer]

		console.log("\nApplying obfuscation tree...")
	}
	else {
		console.log("Transforming new expressions...")
	}

	let program2 = ts.createProgram(fileNames, {
		target: ts.ScriptTarget.ES2018,
		module: ts.ModuleKind.CommonJS,
		removeComments: true,
		experimentalDecorators: true,
		emitDecoratorMetadata: true,
		resolveJsonModule: true,
		noImplicitAny: true,
		outDir: outDirectory,
		jsx: ts.JsxEmit.React,
	})

	Obfuscator.checker = program2.getTypeChecker()
	program2.emit(undefined, undefined, undefined, false, {
		before: transformers,
	})

	if(obfuscate) {
		ImportFixer.readAllFiles(outDirectory, inDirectory, outDirectory)
	}

	FileCopy.copyAllFiles(inDirectory, inDirectory, outDirectory)

	// Rust.compile(rustDirectory, outDirectory)

	console.log("Finished.")
}
else {
	console.log("Entry file does not exist!")
}