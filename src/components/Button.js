import './Button.css';

/*
props-
 cat : (operator, operand, other) - category of button
 val - string displayed in the innerHTML of the button
 handleClick - lifts state up to get the button data to Calculator
*/

export default function Button(props) {
    const getModifier = () => {
        if (props.cat === 'operand' || props.cat === 'operator') {
            return props.cat;
        }
        switch (props.val) {
            case 'del':
                return "delete";
            case 'C':
                return "clear";
            case '()':
                return "parentheses";
            case '(-)':
                console.log("got it")
                return "negative"
            case '.':
                return "decimal"
            case '=':
                return "equals"
            default:
                throw new Error('val not found')
        }
    }
    console.log(`button__button-${getModifier()}`)

    return (
        <button className={`button__button button__button-${getModifier()}`}
            type='button'
            onClick={() => props.handleClick
                ({ val: props.val, cat: props.cat })}
        >
            {props.val}
        </button>
    )
}
