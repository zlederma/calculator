import './Button.css';

/*
props-
 cat : (operator, operand, other) - category of button
 val - string displayed in the innerHTML of the button
 setButton - lifts state up to get the button data to Calculator
*/
export default function Button(props) {
    return (
        <button className='button__button'
            type='button'
            onClick={() => props.setButton
                ({ val: props.val, cat: props.cat })}
        >
            {props.val}
        </button>
    )
}
