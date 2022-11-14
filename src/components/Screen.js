import './Screen.css';
export default function Screen(props) {

    const showEquation = () => {
        const charactars = [];
        for (let i = 0; i < props.equation.length; i++) {
            charactars.push(
                <div className='screen__charactar'>
                    {props.equation[i].val}
                </div>)
        }
        return charactars;
    }

    return (
        <div className='screen__container'>
            <div className='screen__equation'>
                {props.equation.length === 0 ? "0" : showEquation()}
            </div>
            <div className='screen__result'>
                {props.result === undefined ? "" : props.result}
            </div>
        </div>
    )
}
