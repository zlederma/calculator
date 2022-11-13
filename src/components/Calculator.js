import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
import { useState } from 'react';

export default function Calculator() {
    //use useState to lift up state in order to figure out what button is pressed
    const [button, setButton] = useState({});

    return (
        <div className='calculator__container'>
            <Screen />
            <Buttons setButton={setButton} />
        </div>
    )
}
