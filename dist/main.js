"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const obfuscationMap_1 = require("./obfuscationMap");
const obfuscationRoot_1 = require("./structure/obfuscationRoot");
const importFixer_1 = require("./importFixer");
obfuscationMap_1.default.root = new obfuscationRoot_1.default(undefined, "", undefined, true);
importFixer_1.default.readAllFiles("./dist/test");
/*console.log("Transpiling...")
let program1 = ts.createProgram(["./dist/test/main.ts"], {
    target: ts.ScriptTarget.ES2018,
    module: ts.ModuleKind.CommonJS,
    noImplicitAny: true,
})

Obfuscator.checker = program1.getTypeChecker()
program1.emit(undefined, undefined, undefined, false, {
    before: [ObfuscationMap.transformer]
})
ObfuscationMap.root.inheritClasses()
ObfuscationMap.root.processUnfinished()
ObfuscationMap.debugPrint()



let program2 = ts.createProgram(["./dist/test/main.ts"], {
    target: ts.ScriptTarget.ES2018,
    module: ts.ModuleKind.CommonJS,
    removeComments: true,
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    resolveJsonModule: true,
    noImplicitAny: true,
})

Obfuscator.checker = program2.getTypeChecker()
program2.emit(undefined, undefined, undefined, false, {
    // before: [NewExpressionTransformer.transformer]
    before: [Obfuscator.transformer]
})
console.log("Finished.")*/ 
//# sourceMappingURL=main.js.map