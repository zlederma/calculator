import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useRef } from 'react';

export default function Calculator() {
    //For the future: comment my code better.
    //For the future: make the calculators layout more responsive.
    //For the future: clean up code and add helper function for reused code.
    const [equation, setEquation] = useState([]);
    const [result, setResult] = useState("");
    const currEquation = useRef([]) //For synchronous updates
    let prevTerm = equation.length > 0 ? equation[equation.length - 1] : {};

    //use this to keep track of how many opening(l) and closing(r) parentheses there are
    //For the future: parse this out into its own "parentheses" class
    const lParenthesesCount = useRef(0);
    const rParenthesesCount = useRef(0);
    const areParenthesesClosed = lParenthesesCount.current === rParenthesesCount.current ? true : false;

    //Button objects
    const lParentheses = { name: "parentheses", val: "(" }
    const rParentheses = { name: "parentheses", val: ")" }
    const multiply = { name: "operator", val: "x" }
    const neg = { name: "operand", val: "-" }
    const zero = { name: "operand", val: "0." };

    //TODO Typeof anything / 0 is infinity
    //Have to pass in equation because the equation in useState does not update synchronously
    //For the future: parse this out into a calculate class
    const cleanEquation = (equation) => {
        let clean = [...equation];
        const numParentheses = lParenthesesCount.current - rParenthesesCount.current;
        for (let i = 0; i < numParentheses; i++) {
            clean.push(rParentheses);
        }
        return clean;
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
    const infixToPostfix = (equation) => {

        let stack = [];
        let result = [];

        for (let i = 0; i < equation.length; i++) {
            let val = equation[i].val !== undefined ? equation[i].val : "";
            let name = equation[i].name !== undefined ? equation[i].name : "";

            if (name === "operand") {
                result.push(equation[i]);
            }

            else if (val === '(') {
                stack.push(lParentheses);
            }

            else if (val === ')') {
                while (stack.length > 0 && stack[stack.length - 1].val !== '(') {
                    result.push(stack.pop());
                }
                stack.pop()
            }

            else if (name === "operator") {
                while (stack.length !== 0 && precedence(val) <= precedence(stack[stack.length - 1].val)) {
                    result.push(stack.pop());
                }
                stack.push(equation[i]);
            }
        }

        // Pop all the remaining elements from the stack
        while (stack.length !== 0) {
            result.push(stack.pop());
        }
        return result;
    }

    const calculatePostfix = (equation) => {

        let stack = [];

        for (let i = 0; i < equation.length; i++) {
            const name = equation[i].name
            const val = equation[i].val

            if (name === "operand") {
                stack.push(parseFloat(val));
            }

            else {
                let term1 = stack.pop();
                let term2 = stack.pop();

                switch (val) {
                    case '+':
                        stack.push(parseFloat((term2 + term1).toFixed(6)));
                        break;

                    case '-':
                        stack.push(parseFloat((term2 - term1).toFixed(6)));
                        break;

                    case '÷':
                        stack.push(parseFloat((term2 / term1).toFixed(6)));
                        break;

                    case 'x':
                        stack.push(parseFloat((term2 * term1).toFixed(6)));
                        break;

                    case '^':
                        stack.push(parseFloat((Math.pow(term2, term1)).toFixed(6)));
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
        if (equation.length === 0) {
            setEquation([...equation, button]);
        }
        else if (prevTerm.name === 'operand') {
            const temp = [...equation];
            temp[temp.length - 1].val = prevTerm.val + button.val;
            setEquation(temp);
            currEquation.current = temp;
        }

        else if (prevTerm.val === ')') {
            setEquation([...equation, multiply, lParentheses, button]);
            currEquation.current = [...equation, multiply, lParentheses, button];
            lParenthesesCount.current = lParenthesesCount.current + 1;
        }
        else {
            setEquation([...equation, button]);
            currEquation.current = [...equation, button];
        }

        if (equation.length > 1) {
            let clean = cleanEquation(currEquation.current);
            let postfix = infixToPostfix(clean);
            setResult(calculatePostfix(postfix).toString());
        }
    }

    const del = () => {
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

    const clear = () => {
        setEquation([]);
        setResult("");
    }

    const parentheses = (button) => {
        if (equation.length === 0) {
            button.val = "("
            setEquation([...equation, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
        }
        else if (prevTerm.name === 'operator' || prevTerm.val === '(') {
            button.val = "("
            setEquation([...equation, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
        }
        else if ((prevTerm.name === 'operand' || prevTerm.val === ")") && !areParenthesesClosed) {
            button.val = ")"
            setEquation([...equation, button]);
            rParenthesesCount.current = rParenthesesCount.current + 1;
        }
        else if ((prevTerm.val === ")" && areParenthesesClosed) || lParenthesesCount.current === 0) {
            button.val = "(";
            setEquation([...equation, multiply, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
        }
        else if ((prevTerm.name === "operand" && prevTerm.val.endsWith("-")) || prevTerm.val.endsWith(".")) {
            console.log('Not allowed');
        }

        else {
            console.log('A case we were not expecting')
        }

    }

    const negative = () => {
        if (equation.length === 0 || prevTerm.name === "operator") {
            setEquation([...equation, lParentheses, neg]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
        }

        else if (prevTerm.val === "(") {
            setEquation([...equation, neg]);
        }

        else if (prevTerm.val === ")") {
            setEquation([...equation, multiply, lParentheses, neg]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
        }

        else if (prevTerm.name === "operand" && prevTerm.val.endsWith("-")) {
            const temp = equation.slice(0, equation.length - 2);
            setEquation(temp);
            lParenthesesCount.current = lParenthesesCount.current - 1;
        }

        else if (prevTerm.name === "operand" || prevTerm.val.endsWith(".")) {
            console.log('Not allowed');
        }
    }

    const decimal = (button) => {
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
        if (prevTerm.name === "operand" || prevTerm.val === ")") {
            let clean = cleanEquation(equation)
            let postFix = infixToPostfix(clean);
            let calculation = calculatePostfix(postFix);
            let term = { name: "operand", val: calculation.toString() }
            setResult("");
            setEquation([term]);

            lParenthesesCount.current = 0;
            rParenthesesCount.current = 0
        }
        else {
            console.log('Not allowed');
        }
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
            <Screen equation={equation} result={result} />
            <Buttons handleClick={handleClick} />
        </div>
    )
}
