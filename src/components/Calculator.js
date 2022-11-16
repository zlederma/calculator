import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useEffect, useRef } from 'react';

export default function Calculator() {
    //(-) will become n
    //use useState to lift up state in order to figure out what button is pressed
    const [equation, setEquation] = useState([]);
    let prevTerm = equation.length > 0 ? equation[equation.length - 1] : {};
    const result = useRef("Hi");
    //use this to keep track of how many opening(l) and closing(r) parentheses there are
    const lParenthesesCount = useRef(0);
    const rParenthesesCount = useRef(0);
    const areParenthesesClosed = lParenthesesCount.current === rParenthesesCount.current ? true : false;



    const operator = (button) => {
        if (equation.length === 0) {
            throw new Error('Not allowed');
        }
        if (prevTerm.cat === 'operator') {
            //creating a temp variable so that react sees this as a new array.
            const temp = [...equation];
            temp[temp.length - 1] = button;
            setEquation(temp);
            return;
        }
        if (prevTerm.cat === "n" || prevTerm.val.endsWith(".") || prevTerm.val === "(") {
            throw new Error('Not allowed');
        }

        setEquation([...equation, button])
    }

    const operand = (button) => {
        if (equation.length === 0) {
            setEquation([...equation, button]);
            return;
        }
        if (prevTerm.cat === 'operand' || prevTerm.val === 'n' || prevTerm.val === '.') {
            const temp = [...equation];
            temp[temp.length - 1].val = prevTerm.val + button.val;
            setEquation(temp);
            return;
        }
        setEquation([...equation, button]);
    }

    const other = (button) => {
        const val = button.val;
        switch (val) {
            case 'del':
                del();
                break;
            case 'C':
                clear();
                break;
            case '()':
                parentheses(button);
                break;
            case '(-)':
                negative();
                break;
            case '.':
                decimal(button);
                break;
            case '=':
                equals();
                break;
            default:
                throw new Error('val not found')
        }

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
        if (prevTerm.cat === 'operator' || prevTerm.val === '(') {
            button.val = "("
            setEquation([...equation, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }
        if ((prevTerm.cat === 'operand' || prevTerm.val === ")") && !areParenthesesClosed) {
            button.val = ")"
            setEquation([...equation, button]);
            rParenthesesCount.current = rParenthesesCount.current + 1;
            return;
        }
        if ((prevTerm.val === ")" && areParenthesesClosed) || lParenthesesCount.current === 0) {
            button.val = "(";
            const multiply = { cat: "operator", val: "x" };
            setEquation([...equation, multiply, button]);
            lParenthesesCount.current = lParenthesesCount.current + 1;
            return;
        }
        if (prevTerm.val === "n" || prevTerm.val.endsWith(".")) {
            throw new Error('Not allowed');
        }
        else {
            throw new Error('A case we were not expecting');
        }
    }

    const negative = (button) => {
        const lParentheses = { cat: "other", val: "(" }
        const multiply = { cat: "operator", val: "x" }
        const neg = { cat: "other", val: "n" }
        if (equation.length === 0 || prevTerm.cat === "operator") {
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

        if (prevTerm.val === "n") {
            const temp = equation.slice(0, equation.length - 2);
            setEquation(temp);
            lParenthesesCount.current = lParenthesesCount.current - 1;
            return;
        }

        if (prevTerm.cat === "operand" || prevTerm.val === ".") {
            throw new Error('Not allowed');
        }
    }

    const decimal = (button) => {
        const zero = { cat: "operand", val: "0." };
        const multiply = { cat: "operator", val: "x" }
        if (prevTerm.val === "." || prevTerm.val.includes(".")) {
            throw new Error('Not allowed');
        }

        if (equation.length === 0 || prevTerm.cat === "operator" || prevTerm.val === "(" || prevTerm.val === "n") {
            setEquation([...equation, zero]);
        }

        if (prevTerm.val === ")") {
            setEquation([...equation, multiply, zero]);
        }
        if (prevTerm.cat === "operand") {
            const temp = [...equation];
            temp[temp.length - 1].val = prevTerm.val + button.val;
            setEquation(temp);
        }
    }

    const equals = (button) => {

    }

    //this will be the main function that handles all the logic for when a user clicks a button
    //should include updating result and equation
    const handleClick = (button) => {
        const cat = button.cat;
        switch (cat) {
            case 'operator':
                operator(button);
                break;
            case 'operand':
                operand(button);
                break;
            case 'other':
                other(button);
                break;
            default:
                throw new Error('val not found')
        }
    }

    return (
        <div className='calculator__container'>
            <Screen equation={equation} result={result.current} />
            <Buttons handleClick={handleClick} />
        </div>
    )
}
