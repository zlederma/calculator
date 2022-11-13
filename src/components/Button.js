import './Button.css';

//Props: handleClick, category, val
export default function Button(props) {
    return (
        <button className='button__button'
            type='button'
            onClick={event => props.setButton({ val: props.val })}
        >
            {props.val}
        </button>
    )
}
