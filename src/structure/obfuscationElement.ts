import ObfuscationMap from "../obfuscationMap";
import * as ts from "typescript"

export default class ObfuscationElement {
	public parent: ObfuscationElement
	public scope: Set<ObfuscationElement> = new Set<ObfuscationElement>()
	public obfuscation: string = ""
	public name: string = ""
	public node: ts.Node
	public isFinished: boolean = false

	constructor(parent: ObfuscationElement, name: string, node: ts.Node, isFinished: boolean, obfuscation?: string) {
		name = ObfuscationMap.sanitizeName(name)
		if(!parent || !parent.nameToElement(name)) {
			this.parent = parent
			this.name = name
			this.node = node
			this.isFinished = isFinished

			if(parent) {
				this.parent.scope.add(this)
			}

			if(this.isFinished) {
				this.generateObfuscation(obfuscation)
			}
		}
	}

	public generateObfuscation(obfuscation?: string): void {
		// generate an obfuscated name
		if(obfuscation == undefined) {
			while(this.isObfuscationTaken(obfuscation = ObfuscationMap.getObfuscatedName())) {}
		}
		this.obfuscation = obfuscation
	}

	// checks to see if this obfuscation is taken in our scope, or any of the scopes above us
	public isObfuscationTaken(obfuscation: string): boolean {
		if(this.parent) {
			for(let object of this.parent.scope) {
				if(object != this) {
					if(object.obfuscation == obfuscation) {
						return true
					}
					else if(object.parent) {
						return object.parent.isObfuscationTaken(obfuscation) // check to see if the obfuscated name is taken above this node
					}
				}
			}
		}
		return undefined
	}

	public nameToElement(name: string): ObfuscationElement {
		for(let object of this.scope) {
			if(object.name == name) {
				return object
			}
		}
		return undefined
	}

	public printScope(): void {
		console.log(`Obfuscated names in scope ${this.name}:`)
		for(let child of this.scope.values()) {
			console.log(`   ${child.name} => ${child.obfuscation}`)
		}
		
		for(let child of this.scope) {
			if(child.scope.size > 0) {
				child.printScope()
			}
		}
	}

	// returns the number of nodes that are under this node's children's node
	public getCount(): number {
		let count = 1
		for(let child of this.scope) {
			count += child.getCount()
		}
		return count
	}
}