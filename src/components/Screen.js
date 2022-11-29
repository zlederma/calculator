import './Screen.css';
export default function Screen(props) {
    const showEquation = () => {
        const equation = [];
        for (let i = 0; i < props.equation.length; i++) {
            let className = 'screen__term'
            if (props.equation[i].name === "operator" || props.equation[i].name === "parentheses") {
                className += "-purple"
            }

            equation.push(
                <div className={className} key={i}>{props.equation[i].val}</div>);
        }

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
