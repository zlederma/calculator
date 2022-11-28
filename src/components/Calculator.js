import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useRef } from 'react';

export default function Calculator() {
    //(-) will become n
    //use useState to lift up state in order to figure out what button is pressed
    const [equation, setEquation] = useState([]);
    let prevTerm = equation.length > 0 ? equation[equation.length - 1] : {};
    const result = useRef("Hello");
    //use this to keep track of how many opening(l) and closing(r) parentheses there are
    const lParenthesesCount = useRef(0);
    const rParenthesesCount = useRef(0);
    const areParenthesesClosed = lParenthesesCount.current === rParenthesesCount.current ? true : false;

    //Typeof anything / 0 is infinity
    //add parentheses
    //Solve for the case where there is an operand surrounded by parentheses.
    const cleanEquation = () => {

    }

    //Function to return precedence of operators
    const precedence = (val) => {
        if (val === '^')
            return 3;
        else if (val === '÷' || val === 'x')
            return 2;
        else if (val === '+' || val === '-')
            return 1;
        else
            return -1;
    }

    //Source: https://www.geeksforgeeks.org/convert-infix-expression-to-postfix-expression/
    const infixToPostfix = (cleanEquation) => {

        let stack = []; //For stack operations, we are using C++ built in stack
        let result = [];

        for (let i = 0; i < cleanEquation.length; i++) {
            let val = cleanEquation[i].val;
            let name = cleanEquation[i].name !== undefined ? cleanEquation[i].name : "";

            // If the scanned character is
            // an operand, add it to output string.
            if (name === "operand") {
                result.push(cleanEquation[i]);
            }

            // If the scanned character is an
            // ‘(‘, push it to the stack.
            else if (val === '(') {
                const lParentheses = { name: "parentheses", val: "(" }
                stack.push(lParentheses);
            }

            // If the scanned character is an ‘)’,
            // pop and to output string from the stack
            // until an ‘(‘ is encountered.
            else if (val === ')') {
                while (stack[stack.length - 1].val !== '(') {
                    result.push(stack.pop());
                }
                stack.pop()
            }

            //If an operator is scanned
            else {
                while (stack.length !== 0 && precedence(val) <= precedence(stack[stack.length - 1]).val) {
                    result.push(stack.pop());
                }
                stack.push(cleanEquation[i]);
            }
        }

        // Pop all the remaining elements from the stack
        while (stack.length !== 0) {
            result.push(stack.pop());
        }
        return result;
    }

    const calculatePostfix = (postfixEquation) => {

        //create a stack
        let stack = [];

        // Scan all characters one by one
        for (let i = 0; i < postfixEquation.length; i++) {
            const name = postfixEquation[i].name
            const val = postfixEquation[i].val


            // If the scanned character is an operand (number here),
            // push it to the stack.
            if (name === "operand") {
                stack.push(parseFloat(val));
            }

            //  If the scanned character is an operator, pop two
            // elements from stack apply the operator
            else {
                let term1 = stack.pop();
                let term2 = stack.pop();

                switch (val) {
                    case '+':
                        stack.push(term2 + term1);
                        break;

                    case '-':
                        stack.push(term2 - term1);
                        break;

                    case '÷':
                        stack.push(term2 / term1);
                        break;

                    case 'x':
                        stack.push(term2 * term1);
                        break;

                    case '^':
                        stack.push(Math.pow(term2, term1));
                        break;

                    default:
                        console.log('name not found')
                }
            }
        }
        return stack.pop();
    }

    const operator = (button) => {
        if (equation.length === 0) {
            console.log('Not allowed');
        }
        if (prevTerm.name === 'operator') {
            //creating a temp variable so that react sees this as a new array.
            const temp = [...equation];
            temp[temp.length - 1] = button;
            setEquation(temp);
            return;
        }
        if ((prevTerm.name === "operand" && prevTerm.val.endsWith("-")) || prevTerm.val.endsWith(".") || prevTerm.val === "(") {
            console.log('Not allowed'); //For the future: Error message for the user.
            return;
        }

        setEquation([...equation, button])
    }

    const operand = (button) => {
        console.log("test")
        if (equation.length === 0) {
            setEquation([...equation, button]);
            return;
        }
        if (prevTerm.name === 'operand') {
            const temp = [...equation];
            temp[temp.length - 1].val = prevTerm.val + button.val;
            setEquation(temp);
            return;
        }

        if (prevTerm.val === ')') {
            const lParentheses = { name: "parentheses", val: "(" }
            const multiply = { name: "operator", val: "x" }
            setEquation([...equation, multiply, lParentheses, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }
        setEquation([...equation, button]);
    }

    const del = (button) => {
        if (equation[equation.length - 1] === "(") {
            lParenthesesCount.current = lParenthesesCount.current - 1;
        }

        if (equation[equation.length - 1] === ")") {
            rParenthesesCount.current = rParenthesesCount.current - 1;
        }

        const temp = equation.slice(0, equation.length - 1);
        setEquation(temp);
        return;

    }

    const clear = (button) => {

    }

    const parentheses = (button) => {
        if (equation.length === 0) {
            button.val = "("
            setEquation([...equation, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }
        if (prevTerm.name === 'operator' || prevTerm.val === '(') {
            button.val = "("
            setEquation([...equation, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }
        if ((prevTerm.name === 'operand' || prevTerm.val === ")") && !areParenthesesClosed) {
            button.val = ")"
            setEquation([...equation, button]);
            rParenthesesCount.current = rParenthesesCount.current + 1;
            return;
        }
        if ((prevTerm.val === ")" && areParenthesesClosed) || lParenthesesCount.current === 0) {
            button.val = "(";
            const multiply = { name: "operator", val: "x" };
            setEquation([...equation, multiply, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }
        if ((prevTerm.name === "operand" && prevTerm.val.endsWith("-")) || prevTerm.val.endsWith(".")) {
            console.log('Not allowed');
            return;
        }

        console.log('A case we were not expecting');

    }

    const negative = (button) => {
        const lParentheses = { name: "parentheses", val: "(" }
        const multiply = { name: "operator", val: "x" }
        const neg = { name: "operand", val: "-" }
        if (equation.length === 0 || prevTerm.name === "operator") {
            setEquation([...equation, lParentheses, neg]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }

        if (prevTerm.val === "(") {
            setEquation([...equation, neg]);
            return;
        }

        if (prevTerm.val === ")") {
            setEquation([...equation, multiply, lParentheses, neg]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }

        if (prevTerm.name === "operand" && prevTerm.val.endsWith("-")) {
            const temp = equation.slice(0, equation.length - 2);
            setEquation(temp);
            lParenthesesCount.current = lParenthesesCount.current - 1;
            return;
        }

        if (prevTerm.name === "operand" || prevTerm.val.endsWith(".")) {
            console.log('Not allowed');
        }
    }

    const decimal = (button) => {
        const zero = { name: "operand", val: "0." };
        const multiply = { name: "operator", val: "x" }
        if (prevTerm.val.includes(".")) {
            console.log('Not allowed');
            return;
        }

        if (equation.length === 0 || prevTerm.name === "operator" || prevTerm.val === "(" || (prevTerm.name === "operand" && prevTerm.val.endsWith("-"))) {
            setEquation([...equation, zero]);
            return;
        }

        if (prevTerm.val === ")") {
            setEquation([...equation, multiply, zero]);
            return;
        }
        if (prevTerm.name === "operand") {
            const temp = [...equation];
            temp[temp.length - 1].val = prevTerm.val + button.val;
            setEquation(temp);
            return;
        }
    }

    const equals = () => {
        let postFix = infixToPostfix(equation);
        let result = calculatePostfix(postFix);
        console.log(result)
    }

    //this will be the main function that handles all the logic for when a user clicks a button
    //should include updating result and equation
    const handleClick = (button) => {
        const name = button.name;
        switch (name) {
            case 'operator':
                operator(button);
                break;
            case 'operand':
                operand(button);
                break;
            case 'del':
                del();
                break;
            case 'clear':
                clear();
                break;
            case 'parentheses':
                parentheses(button);
                break;
            case 'negative':
                negative();
                break;
            case 'decimal':
                decimal(button);
                break;
            case 'equals':
                equals();
                break;
            default:
                console.log('name not found')
        }
    }

    return (
        <div className='calculator__container'>
            <Screen equation={equation} result={result.current} />
            <Buttons handleClick={handleClick} />
        </div>
    )
}
