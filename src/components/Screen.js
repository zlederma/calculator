import './Screen.css';
export default function Screen(props) {
    return (
        <div className='screen__container'>
            <div className='screen__equation'>{props.equation}</div>
        </div>
    )
}
