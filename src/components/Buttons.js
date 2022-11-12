import './Buttons.css';
import Button from './Button';
const showButtons = () => {
    const buttons = [];
    for (let i = 0; i < 20; i++) {
        buttons.push(<Button />)
    }
    return buttons;
}

export default function Buttons() {
    return (
        <div className='buttons__container'>
            {showButtons()}
        </div>
    )
}
