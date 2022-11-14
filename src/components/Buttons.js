import './Buttons.css';
import Button from './Button';

export default function Buttons(props) {
    const showButtons = () => {
        const buttons = [];
        for (let i = 0; i < 20; i++) {
            buttons.push(<Button val='h' setButton={props.setButton} />)
        }
        return buttons;
    }
    return (
        <div className='buttons__wrapper'>
            <div className='buttons__delete-container'>
                <Button cat='other' val='del' setButton={props.setButton} />
            </div>
            <div className='buttons__container'>
                <Button cat='other' val='C' setButton={props.setButton} />
                <Button cat='other' val='()' setButton={props.setButton} />
                <Button cat='operator' val='^' setButton={props.setButton} />
                <Button cat='operator' val='÷' setButton={props.setButton} />
                <Button cat='operand' val='7' setButton={props.setButton} />
                <Button cat='operand' val='8' setButton={props.setButton} />
                <Button cat='operand' val='9' setButton={props.setButton} />
                <Button cat='operator' val='x' setButton={props.setButton} />
                <Button cat='operand' val='4' setButton={props.setButton} />
                <Button cat='operand' val='5' setButton={props.setButton} />
                <Button cat='operand' val='6' setButton={props.setButton} />
                <Button cat='operator' val='-' setButton={props.setButton} />
                <Button cat='operand' val='1' setButton={props.setButton} />
                <Button cat='operand' val='2' setButton={props.setButton} />
                <Button cat='operand' val='3' setButton={props.setButton} />
                <Button cat='operator' val='+' setButton={props.setButton} />
                <Button cat='other' val='(-)' setButton={props.setButton} />
                <Button cat='operand' val='0' setButton={props.setButton} />
                <Button cat='other' val='.' setButton={props.setButton} />
                <Button cat='other' val='=' setButton={props.setButton} />
            </div>
        </div>
    )
}
