# Calculator

[Link to calculator](https://polite-wisp-6d494b.netlify.app/).

## Technical Decisions

- Chunking out the calculator into small components (Button, Buttons, Screen, Calculator) - keeps code more readable, more reusable, and is just a good programming practice.
- The calculation is made by making a function to translate the equation from an infix to a postfix expression, and then evaluating the postfix expression. - allowing me to more easily account for parentheses. There may have been more efficient ways to do the actual calculation, such as using a parsing library, but it was a fun algorithm to implement, and hopefully shows more technicality.
- Using the “button” object consisting of a “name” and “val”, this was used throughout the project. I wanted to keep this object simple and informative. I considere\*d just using “val” but an edge case was that the minus sign and negative are the same, otherwise I would have used a function and/or regex to determine what button was pressed, and subsequently what the terms in the equation are.
- As the user presses buttons, the button objects are stored in an array called “equation”. The buttons array was kept because I later used it to style different pieces of the expression.

## Design Decisons

The calculator is user friendly, increasing the complexity of the code.

- The input of the users is controlled to stop users from making mistakes - if I were to continue this project I would add error messages for the user (right now I’m just console.logging it. I thought about throwing an error, but my understanding is that error messages are not used for user errors.
- There is a function to determine which parentheses, open or closing, should be used in different scenarios, making it so that the user can just click the “( )” button, reducing cognitive strain on the user.
- Some smaller features are included, such as when a user hits a “(“ after a “)” the code automatically prepends a “x”.
- Results are constantly updated for the user to create a good user experience.
- The buttons are styled to feel like you are pushing down the button on a physical calculator.

## Extending Code

I have a lot of smaller things I would work on if continuing this project, but here are some of the bigger ones:

- Taking a lot of the code in “Calculator.js” and modify it to use two classes. A “Calculate” class and a “Parentheses” class. This would help to better encapsulate the logic that these two areas of the code entail, along with slimming down the code in “Calculator.js”. As opposed to class based React, functional React is the more common version of React that developers use, so that’s how I’ve trained myself to think in React. Because of this, I find it slightly confusing to combine functional react with classes, but through working on this project I could see just how helpful sending some of the logic to a class would have been.
- I would chunk out the logic more, and add more helper functions.
- Commenting th code better, along with documenting the schema for the Calculator.
