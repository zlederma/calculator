import './Buttons.css';
import Button from './Button';

export default function Buttons(props) {
    return (
        //For the future: change "del" to an icon
        <div className='buttons__wrapper'>
            <div className='buttons__delete-container'>
                <Button name='del' val='del' handleClick={props.handleClick} />
            </div>
            <div className='buttons__container'>
                <Button name='clear' val='C' handleClick={props.handleClick} />
                <Button name='parentheses' val='( )' handleClick={props.handleClick} />
                <Button name='operator' val='^' handleClick={props.handleClick} />
                <Button name='operator' val='÷' handleClick={props.handleClick} />
                <Button name='operand' val='7' handleClick={props.handleClick} />
                <Button name='operand' val='8' handleClick={props.handleClick} />
                <Button name='operand' val='9' handleClick={props.handleClick} />
                <Button name='operator' val='x' handleClick={props.handleClick} />
                <Button name='operand' val='4' handleClick={props.handleClick} />
                <Button name='operand' val='5' handleClick={props.handleClick} />
                <Button name='operand' val='6' handleClick={props.handleClick} />
                <Button name='operator' val='-' handleClick={props.handleClick} />
                <Button name='operand' val='1' handleClick={props.handleClick} />
                <Button name='operand' val='2' handleClick={props.handleClick} />
                <Button name='operand' val='3' handleClick={props.handleClick} />
                <Button name='operator' val='+' handleClick={props.handleClick} />
                <Button name='negative' val='(-)' handleClick={props.handleClick} />
                <Button name='operand' val='0' handleClick={props.handleClick} />
                <Button name='decimal' val='.' handleClick={props.handleClick} />
                <Button name='equals' val='=' handleClick={props.handleClick} />
            </div>
        </div>
    )
}
