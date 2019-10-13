import ObfuscationElement from "./obfuscationElement";
import * as ts from "typescript"

export default class ObfuscationProperty extends ObfuscationElement {
	public isOptional: boolean = false

	constructor(parent: ObfuscationElement, name: string, node: ts.Node, isOptional: boolean, obfuscation?: string) {
		super(parent, name, node, true, obfuscation)

		this.isOptional = isOptional
	}
}