import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useEffect } from 'react';

//Not sure if I like how this is being used

export default function Calculator() {
    //equation is an array of charactars that show the current equation on the screen
    const [equation, setEquation] = useState([]);
    const [result, setResult] = useState(0);
    const [lhs, setLhs] = useState(0);
    const [rhs, setRhs] = useState(0);

    const operator = (button) => {
        if (equation.length === 0) {
            return;
        }
        const val = button.val;
        const cat = button.cat;
        //TODO parentheses logic 
        if (equation[equation.length - 1].cat === 'operand') {
            setEquation([...equation, button])
        }

        if (equation[equation.length - 1].cat === 'operator') {
            //using spead operator to copy the array, but make it so that react sees it as a new array
            const temp = [...equation];
            temp[temp.length - 1] = button;
            setEquation(temp);
        }
        // switch (val) {
        //     case '^':
        //         break;
        //     case '÷':
        //         break;
        //     case 'x':
        //         break;
        //     case '-':
        //         break;
        //     case '+':
        //         break;
        //     case '-':
        //         break;
        //     default:
        //         throw new Error('val not found')
        //     //error handling
        // }
    }

    const operand = (button) => {
        setEquation([...equation, button]);

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

    useEffect(() => {

    }, [equation]);

    return (
        <div className='calculator__container'>
            <Screen equation={equation} result={result} />
            <Buttons handleClick={handleClick} />
        </div>
    )
}
