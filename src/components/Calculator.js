import './Calculator.css';
import Screen from './Screen';
import Buttons from './Buttons';
export default function Calculator() {
    return (
        <div className='calculator__container'>
            <Screen />
            <Buttons />
        </div>
    )
}
