# Calculator

A dependency-free browser calculator for addition, subtraction, multiplication, and division. Open `index.html` directly; no build or server is needed.

```sh
git clone https://github.com/sai161812/calc1.git
cd calc1
```

Open `index.html` with your browser, then use the buttons. `C` clears the expression. Multiplication and division take precedence over addition and subtraction; decimal numbers and unary signs are supported. Invalid expressions and division by zero show `Error`. The next digit starts a new expression.

Expressions are parsed as arithmetic rather than evaluated as JavaScript. Inputs are limited to 256 characters. Results use JavaScript floating-point numbers, so this is not a financial or arbitrary-precision calculator. Parentheses, powers, and scientific notation are not supported.

## Verify

With Node.js 18 or newer:

```sh
node --test tests/calculator.test.cjs
```

Checks cover precedence, decimals, leading zeros, malformed expressions, division by zero, and recovery after an error. Styles live in `styles.css`.
