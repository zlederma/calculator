import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState, useEffect } from 'react';

export default function Calculator() {
    //use useState to lift up state in order to figure out what button is pressed
    const [button, setButton] = useState({});
    const [equation, setEquation] = useState("");

    useEffect(() => {
        //switch this to an array so that I can change the color of the operators
        setEquation(button.val)
    }, [button]);

    return (
        <div className='calculator__container'>
            <Screen equation={equation} />
            <Buttons setButton={setButton} />
        </div>
    )
}
