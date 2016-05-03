// This is a quick asyncjs waterfall tutorial.
// Full documentation: https://github.com/caolan/async#waterfall
var async = require('async');

/* This is the syntax for async waterfall
async.waterfall([

    A list of functions
    with callbacks that
    we want to run in order

], function(err,res){
        This function stores our result
});
*/

/*
Few things to note.
1)
Each function ends with a callback function with the number of arguments equal to the number of arguments of the next function.
For example, in function 2, arg1,arg2,C,C get passed into blah1,blah2,blah3,blah4

2)
The first "null" of each callback is reserved for returning errors.
If a non-null value is passed at any point of any of the three functions then it propagates down until
it hits the result function, and throws an error.

3)
Basically, to get synchronous control flow, a function's callback contains
the arguments for the next function. Make sure the arguments line up

4)
Can you guess what the value of finalResult is?
Run this project with "npm install" and then "npm start"
and find out!
*/

async.waterfall([
    function(callback) {
        console.log("=====INSIDE FIRST FUNCTION=====")
        var A = 10;
        var B = 20;
        console.log("1.A = " + A);
        console.log("1.B = " + B);

        //callback("oh no!");
        // This would skip the next two functions since the first arg is non-null,
        // signifying that it is an error. Try uncommenting the above line and commenting the below function.

        //This is a normal return statement. first arg says no error, rest of args are passed to next func
        callback(null, A, B);
    },
    function(arg1,arg2,callback) {
        console.log("=====INSIDE SECOND FUNCTION=====")
        console.log("2.arg1 = " + arg1);
        console.log("2.arg2 = " + arg2);
        var C = arg1+arg2;
        callback(null,arg1,arg2,C,C);
    },
    function(blah1,blah2,blah3,blah4,callback) {
        console.log("=====INSIDE THIRD FUNCTION=====")
        console.log("3.blah1 = " + blah1);
        console.log("3.blah2 = " + blah2);
        console.log("3.blah3 = " + blah3);
        console.log("3.blah4 = " + blah4);
        callback(null,blah2);
    }

], function(err,res) {
    if(err)
        console.log("Error :" + err);
    else {
        console.log("=====INSIDE RESULT FUNCTION=====");
        var finalResult = res;
        console.log("FINAL RESULT = " + finalResult);
    }
});
