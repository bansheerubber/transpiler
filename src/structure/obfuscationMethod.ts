import ObfuscationElement from "./obfuscationElement";

export default class ObfuscationMethod extends ObfuscationElement {
	public arguments: Set<ObfuscationElement> = new Set<ObfuscationElement>()
	public locals: Set<ObfuscationElement> = new Set<ObfuscationElement>()
}