const display = typeof document === "undefined" ? null : document.getElementById("display");

// Only arithmetic tokens are accepted; user input is never JavaScript source.
function evaluateExpression(expression) {
    if (typeof expression !== "string" || expression.length > 256) throw new Error("Invalid expression");
    const source = expression.replace(/\s/g, "");
    const tokens = source.match(/(?:\d+\.?\d*|\.\d+)|[+*/-]/g) || [];
    if (!tokens.length || tokens.join("") !== source) throw new Error("Invalid expression");
    let position = 0;
    function number() {
        let sign = 1;
        while (tokens[position] === "+" || tokens[position] === "-") {
            if (tokens[position++] === "-") sign *= -1;
        }
        const token = tokens[position++];
        if (!token || !/^(?:\d+\.?\d*|\.\d+)$/.test(token)) throw new Error("Expected number");
        return sign * Number(token);
    }
    function product() {
        let value = number();
        while (tokens[position] === "*" || tokens[position] === "/") {
            const operator = tokens[position++];
            const right = number();
            if (operator === "/" && right === 0) throw new Error("Division by zero");
            value = operator === "*" ? value * right : value / right;
        }
        return value;
    }
    let value = product();
    while (tokens[position] === "+" || tokens[position] === "-") {
        const operator = tokens[position++];
        const right = product();
        value = operator === "+" ? value + right : value - right;
    }
    if (position !== tokens.length || !Number.isFinite(value)) throw new Error("Invalid result");
    return value;
}

function appendToDisplay(input) {
    if (!/^[0-9.+*/-]$/.test(input)) return;
    if (display.value === "Error") display.value = "";
    if (display.value.length < 256) display.value += input;
}
function clearDisplay() { display.value = ""; }
function calculate() {
    try { display.value = String(evaluateExpression(display.value)); }
    catch { display.value = "Error"; }
}
if (typeof module !== "undefined") module.exports = {evaluateExpression};
