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

    }

    const operand = (val) => {

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
            //error handling
        }

    }

    const parentheses = () => {

    }

    const equals = () => {

    }

    const clear = () => {

    }

    const negative = () => {

    }

    const decimal = () => {

    }

    const del = () => {

    }

    //this will be the main function that handles all the logic for when a user clicks a button
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
            //error handling
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
