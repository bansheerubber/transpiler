import ObfuscationElement from "./obfuscationElement";
import ObfuscationClass from "./obfuscationClass";
import ObfuscationMap from "../obfuscationMap";

export default class ObfuscationRoot extends ObfuscationElement {
	public globalNameToObfuscation(name: string): ObfuscationElement {
		for(let object of this.scope) {
			if(object.name == name) {
				return object
			}
		}
		return undefined
	}

	public inheritClasses(): void {
		for(let element of this.scope) {
			if(element instanceof ObfuscationClass) {
				element.inheritScope()
			}
		}
	}

	public processUnfinished(): void {
		function recurse(element: ObfuscationElement) {
			for(let temp of element.scope) {
				if(!temp.isFinished) {
					ObfuscationMap.handleNode(temp.node)
				}
				recurse(temp)
			}
		}
		recurse(this)
	}
}