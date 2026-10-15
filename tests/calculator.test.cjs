const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const {evaluateExpression} = require("../script.js");

test("arithmetic precedence, decimals, signs, and leading zeros", () => {
    for (const [input, expected] of [["2+3*4",14],["10/2-3",2],[".5+1.",1.5],["1--2",3],["010+1",11],["-3*2",-6]]) {
        assert.equal(evaluateExpression(input), expected);
    }
});
test("malformed, non-arithmetic, overflowing and zero-divisor input fails", () => {
    for (const input of ["", "2+", "1..2", "2**3", "1/0", "1/-0", "Math.random()", "globalThis.compromised=true", "9".repeat(257)]) {
        assert.throws(() => evaluateExpression(input));
    }
});
test("calculator recovers from an error on the next digit", () => {
    const display = {value:"1/0"};
    const context = vm.createContext({document:{getElementById: () => display}});
    vm.runInContext(fs.readFileSync(path.join(__dirname,"../script.js"),"utf8"),context);
    context.calculate(); assert.equal(display.value,"Error");
    context.appendToDisplay("7"); assert.equal(display.value,"7");
    context.calculate(); assert.equal(display.value,"7");
});
