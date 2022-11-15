import './Buttons.css';
import Button from './Button';

export default function Buttons(props) {
    const showButtons = () => {
        const buttons = [];
        for (let i = 0; i < 20; i++) {
            buttons.push(<Button val='h' handleClick={props.handleClick} />)
        }
        return buttons;
    }
    return (
        <div className='buttons__wrapper'>
            <div className='buttons__delete-container'>
                <Button cat='other' val='del' handleClick={props.handleClick} />
            </div>
            <div className='buttons__container'>
                <Button cat='other' val='C' handleClick={props.handleClick} />
                <Button cat='other' val='()' handleClick={props.handleClick} />
                <Button cat='operator' val='^' handleClick={props.handleClick} />
                <Button cat='operator' val='÷' handleClick={props.handleClick} />
                <Button cat='operand' val='7' handleClick={props.handleClick} />
                <Button cat='operand' val='8' handleClick={props.handleClick} />
                <Button cat='operand' val='9' handleClick={props.handleClick} />
                <Button cat='operator' val='x' handleClick={props.handleClick} />
                <Button cat='operand' val='4' handleClick={props.handleClick} />
                <Button cat='operand' val='5' handleClick={props.handleClick} />
                <Button cat='operand' val='6' handleClick={props.handleClick} />
                <Button cat='operator' val='-' handleClick={props.handleClick} />
                <Button cat='operand' val='1' handleClick={props.handleClick} />
                <Button cat='operand' val='2' handleClick={props.handleClick} />
                <Button cat='operand' val='3' handleClick={props.handleClick} />
                <Button cat='operator' val='+' handleClick={props.handleClick} />
                <Button cat='other' val='(-)' handleClick={props.handleClick} />
                <Button cat='operand' val='0' handleClick={props.handleClick} />
                <Button cat='other' val='.' handleClick={props.handleClick} />
                <Button cat='other' val='=' handleClick={props.handleClick} />
            </div>
        </div>
    )
}
