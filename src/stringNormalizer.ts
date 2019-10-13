import * as ts from "typescript";
import ObfuscationMap from "./obfuscationMap";

export default class StringNormalizer {
	public static transformer(context) {
		ObfuscationMap.currentSourceFile = ""
		return (file) => {
			function visiter(node, context) {
				ObfuscationMap.echoSourceFile(node)

				if(node.kind == ts.SyntaxKind.StringLiteral) {
					let match = node.text.match(/(?<=%\[)(\w+):\W(\w+)(?=\])/g)
					if(match) {
						for(let element of match) {
							let [className, property] = element.split(": ")
							node = ts.createStringLiteral(node.text.replace(`%[${element}]`, property))
						}
					}
				}
				
				return ts.visitEachChild(node, (childNode) => visiter(childNode, context), context)
			}
	
			return visiter(file, context)
		}
	}
}