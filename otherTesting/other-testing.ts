
// Testing classes
console.log("Class testing")

class TestClass {
    public num1!: number;
    public num2!: number;
    private testString!: string;

    public constructor(num1: number, num2: number, testString: string) {
        this.num1 = num1;
        this.num2 = num2;
        this.testString = testString;
    }

    public getSum(): number {
        return this.num1 + this.num2;
    }

    public printString(): void {
        console.log(this.testString);
    }
}

let testClass = new TestClass(1, 2, "test");
console.log("num1: ", testClass.num1);
console.log("num2: ", testClass.num2);
console.log("sum: ", testClass.getSum())
testClass.printString();
testClass.num1 += 3;
console.log("new sum: ", testClass.getSum());


// Testing tuples
console.log("Tuple testing")
const testTuple: [number, string, boolean] = [10, "Test String", false];
console.log(testTuple[0]);
console.log(testTuple[1]);
console.log(testTuple[2]);
