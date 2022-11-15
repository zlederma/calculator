import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useEffect } from 'react';

export default function Calculator() {
    //use useState to lift up state in order to figure out what button is pressed
    const [equation, setEquation] = useState("");

    const operator = (button) => {

    }

    const operand = (button) => {

    }

    const other = (button) => {

    }

    const del = (button) => {

    }

    const clear = (button) => {

    }

    const parentheses = (button) => {

    }

    const negative = (button) => {

    }

    const decimal = (button) => {

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
            <Screen equation={equation} />
            <Buttons handleClick={handleClick} />
        </div>
    )
}
