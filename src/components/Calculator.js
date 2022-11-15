import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useEffect, useRef } from 'react';

//Not sure if I like how this is being used

export default function Calculator() {
    //equation is an array of charactars that show the current equation on the screen
    const [equation, setEquation] = useState([]);

    //store as strings so I can concatenate onto them
    const lastOperator = useRef("x");
    const result = useRef();
    const lhs = useRef();
    const rhs = useRef();

    const calculateResult = () => {
        let res = 0;
        switch (lastOperator.current) {
            case '^':
                // return math.parseFloat(lhs) + parseFloat(rhs)
                break;
            case '÷':
                res = parseFloat(lhs.current) / parseFloat(rhs.current);
                break;
            case 'x':
                res = parseFloat(lhs.current) * parseFloat(rhs.current);
                break;
            case '-':
                res = parseFloat(lhs.current) - parseFloat(rhs.current);
                break;
            case '+':
                res = parseFloat(lhs.current) + parseFloat(rhs.current);
                break;
            default:
                throw new Error('val not found')
            //error handling
        }
        res = res.toFixed(6);
        //parsing again to get rid of trailing 0's
        res = parseFloat(res);
        res = res.toString()
        return res;
    }

    const operator = (button) => {
        if (equation.length === 0) {
            return;
        }
        const val = button.val;
        const cat = button.cat;
        //TODO parentheses logic 
        if (equation[equation.length - 1].cat === 'operand') {
            lastOperator.current = button.val;
            setEquation([...equation, button]);
            lhs.current = rhs.current !== undefined ? result.current : lhs.current;
            rhs.current = undefined;
        }

        if (equation[equation.length - 1].cat === 'operator') {
            //using spead operator to copy the array, but make it so that react sees it as a new array
            const temp = [...equation];
            temp[temp.length - 1] = button;
            lastOperator.current = button.val;
            setEquation(temp);
        }
    }

    const operand = (button) => {
        //TODO add logic for when the last value in equation is an operand
        setEquation([...equation, button]);
        const val = button.val;
        if (lhs.current === undefined) {
            console.log("val:" + val);
            lhs.current = val;
            console.log("lhs:" + lhs.current);
            return;
        }

        if (rhs === undefined && equation[equation.length - 1].cat === 'operand') {
            lhs.current = lhs.current + button.val;
            console.log("lhs:" + lhs)
            return;
        }
        if (equation[equation.length - 1].cat === 'operand') {
            rhs.current = rhs.current + button.val;
            result.current = calculateResult();
            console.log("result" + result)
            return;
        }

        rhs.current = button.val;
        result.current = calculateResult();
        console.log("result:" + result);
    }

    const del = () => {

    }

    const clear = () => {

    }

    const parentheses = () => {

    }

    const negative = () => {

    }

    const decimal = () => {

    }

    const equals = () => {

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
                parentheses();
                break;
            case '(-)':
                negative();
                break;
            case '.':
                decimal();
                break;
            case '=':
                equals();
            default:
                throw new Error('val not found')
        }
    }

    //this will be the main function that handles all the logic for when a user clicks a button
    //should include updating result and equation
    const handleClick = (button) => {
        const category = button.cat;
        const val = button.val;
        switch (category) {
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

    // useEffect(() => {

    // }, [equation]);

    return (
        <div className='calculator__container'>
            <Screen equation={equation} result={result.current} />
            <Buttons handleClick={handleClick} />
        </div>
    )
}
