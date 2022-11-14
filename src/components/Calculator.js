import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useEffect } from 'react';

//Not sure if I like how this is being used

export default function Calculator() {
    //use useState to lift up state in order to figure out what button is pressed
    const [button, setButton] = useState({});
    //equation is an array of charactars that show the current equation on the screen
    const [equation, setEquation] = useState([]);
    const [result, setResult] = useState();

    const operator = (val) => {
        switch (val) {
            case '^':
                break;
            case '÷':
                break;
            case 'x':
                break;
            case '-':
                break;
            case '+':
                break;
            case '-':
                break;
            default:
                throw new Error('val not found')
            //error handling
        }

    }

    const operand = (val) => {

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

    const other = (val) => {
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
        setButton(button)
        const category = button.cat;
        const val = button.val;
        switch (category) {
            case 'operator':
                operator(val);
                break;
            case 'operand':
                operand(val);
                break;
            case 'other':
                other(val);
                break;
            default:
                throw new Error('val not found')
        }
    }

    useEffect(() => {
        //switch this to an array so that I can change the color of the operators
        setEquation([...equation, button])
    }, [button]);

    return (
        <div className='calculator__container'>
            <Screen equation={equation} />
            <Buttons handleClick={handleClick} />
        </div>
    )
}
