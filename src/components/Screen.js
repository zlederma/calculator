import './Screen.css';
export default function Screen(props) {
    const showEquation = () => {
        const equation = [];
        props.equation.forEach(term => equation.push(
            <div className='screen__term'>{term.val}</div>));
        return equation;
    }
    return (
        <div className='screen__container'>
            <div className='screen__equation'>{showEquation()}</div>
            <div className='screen__result-container'>
                <div className='screen__result'>{props.result}</div>
            </div>
        </div>
    )
}
