interface test {
	prop1: string
	prop2: number
	prop3: boolean
}

interface test2 {
	frog: test
}

function egg(variable: test) {
	console.log(variable.prop1)
}

let prop1 = "frog"
let prop2 = 50
let prop3 = true

let testvar1 = {
	prop1,
	prop2,
	prop3,
} as test

egg({
	prop1,
	prop2,
	prop3,
})

let testvar2: test2 = {
	frog: {
		prop1,
		prop2,
		prop3,
	}
}