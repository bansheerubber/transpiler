import ObfuscationElement from "./obfuscationElement";
import ObfuscationMap from "../obfuscationMap";
import ObfuscationMethod from "./obfuscationMethod";
import ObfuscationProperty from "./obfuscationProperty";
import * as ts from "typescript"
import { element } from "prop-types";
import Obfuscator from "../obfuscator";

interface InheritedClass {
	name: string
	node: ts.Node
}

export default class ObfuscationClass extends ObfuscationElement {
	public isAnonymous: boolean = false
	public inherits: Set<InheritedClass> = new Set<InheritedClass>() // list of all classes we inherit
	public typeArguments: string[] = []

	private hasInheritedScope: boolean = false

	// go through the inherit set and inherit their scopes
	public inheritScope(): void {
		if(!this.hasInheritedScope) {
			this.hasInheritedScope = true

			for(let element of this.inherits) {
				let classElement = ObfuscationMap.getObfuscatedClass(element.name)
				
				if(classElement) {
					classElement.inheritScope()

					for(let inheritedElement of classElement.scope) {
						this.renameObfuscation(inheritedElement.name, inheritedElement.obfuscation, inheritedElement)
					}	
				}
				// if we didn't find an obfuscated class, then this type is probably a type we imported from a library. make sure that none of our shared members are obfuscated
				else {
					let type = Obfuscator.checker.getTypeAtLocation(element.node)
					if(type) {
						for(let member of (type.symbol.members as any).keys()) {
							this.removeObfuscation(member)
						}
					}
				}
			}
		}
	}

	// remove one of the names from our scope
	public renameObfuscation(name: string, obfuscation: string, copy: ObfuscationElement): void {
		for(let element of this.scope.values()) {
			if(element.name == name) {
				element.obfuscation = obfuscation
				break
			}
		}
		
		// if we do not have the element in our scope, then create a new one and add it (we're creating a new one so we don't copy over any variable names and what not)
		if(copy instanceof ObfuscationMethod) {
			new ObfuscationMethod(this, name, undefined, true, obfuscation)
		}
		else if(copy instanceof ObfuscationProperty) {
			new ObfuscationProperty(this, name, undefined, false, obfuscation)
		}
		else {
			new ObfuscationElement(this, name, undefined, true, obfuscation)
		}
	}

	// removes obfuscation of a paticular element by overriding its obfuscation value
	public removeObfuscation(name: string): void {
		for(let element of this.scope.values()) {
			if(element.name == name) {
				element.obfuscation = name
			}
		}
	}
}