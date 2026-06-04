"use strict";
// Testing classes
console.log("Class testing");
class TestClass {
    constructor(num1, num2, testString) {
        this.num1 = num1;
        this.num2 = num2;
        this.testString = testString;
    }
    getSum() {
        return this.num1 + this.num2;
    }
    printString() {
        console.log(this.testString);
    }
}
let testClass = new TestClass(1, 2, "test");
console.log("num1: ", testClass.num1);
console.log("num2: ", testClass.num2);
console.log("sum: ", testClass.getSum());
testClass.printString();
testClass.num1 += 3;
console.log("new sum: ", testClass.getSum());
// Testing tuples
console.log("Tuple testing");
const testTuple = [10, "Test String", false];
console.log(testTuple[0]);
console.log(testTuple[1]);
console.log(testTuple[2]);
