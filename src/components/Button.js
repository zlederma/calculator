import './Button.css';

/*
props-
 cat : (operator, operand, other) - category of button
 val - string displayed in the innerHTML of the button
 handleClick - lifts state up to get the button data to Calculator
*/
export default function Button(props) {
    return (
        <button className='button__button'
            type='button'
            onClick={() => props.handleClick
                ({ val: props.val, cat: props.cat })}
        >
            {props.val}
        </button>
    )
}
