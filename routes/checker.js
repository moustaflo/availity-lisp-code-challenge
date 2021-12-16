var express = require('express');
var router = express.Router();

/* POST checker page. */
router.post('/', function(req, res, next) {
    const userInput = req.body['lisp-code'].toString();

    //LISP code checker function
    const checker = () => {
        const containsParentheses = /\(|\)/; 

        //Check if user entered valid LISP data
        if(!userInput || !userInput.match(containsParentheses)) {
            res.render('index', { notification: 'Please enter valid LISP code' });
            return;
        }

        //Iterate through user input and match parentheses
        const mapper = {
            ")": "("
        }
        let stack = [];
        for(let x = 0; x < userInput.length; x++) {
            if(userInput[x] === "(") {
                stack.push(userInput[x]);
            } else if (stack[stack.length -1] === mapper[userInput[x]]) {
                stack.pop();
            } else if (userInput[x] === ")") {
                stack.push(userInput[x]);
            } else continue;
        }
        //Evaluate the end state of the stack
        if(stack.length) {
            return false;
        } else {
            return true;
        }
    }

  res.render('index', { trueOrFalse: checker });
});

module.exports = router;