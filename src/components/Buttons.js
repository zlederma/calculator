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
        <div className='buttons__container'>
            <div className='buttons__delete-container'>
                <Button category='other' val='del' setButton={props.setButton} />
            </div>
            {showButtons()}
        </div>
    )
}
