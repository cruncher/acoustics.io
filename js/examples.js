// Functions

function name(n, fn) {
	
	// 'n' and 'fn' are named arguments
	
	console.log(n);
	
	// All arguments can be accessed through the arguments
	// object. It acts like an array.
	
	console.log(arguments); // [n, m, o ...]
	
	console.log(arguments[0]); // n
	
	console.log(arguments.length); // 1
	
	// Detect if n is an array
	
	if (n instanceof Array) {
		console.log(n.length); // 3
	}
	
	// If it exists, call function 'fn', passing in the 0th
	// index of n as an argument.
	
	if (fn) {
		fn(n[0]);
	}
}


// Call the function 'name'.

name();


// Call the function 'name', passing in an array as the first
// argument and an anonymous function as the second argument.

name([1,2,3], function(a) {
	// do something
	
	console.log(a);
});


// A self-calling anonymous function. We call this a 'closure'.

function() {
	
}();


// Because it is a bit special, we usually wrap closures in
// brackets to remind ourselves when reading the code that
// something special is going on.

(function() {
	
})();


// Only functions have scope in JavaScript, so the only way to
// protect variables from outer scope is by wrapping them in a
// function.

(function() {
	var thing = 'boobies';
	
	console.log(thing); // 'boobies'
})();

console.log(thing); // [TypeError] 'thing' is not defined


// Variables can be passed into a closure just like any other
// function.

(function(n, m) {
	console.log(n); // 1
	console.log(m); // 2	
})(1, 2);


// Note that function declarations do not need to be
// terminated with a semi-colon. When we declared 'name' there
// was no semi-colon after the end brace '}'. Whenever you call
// a function, however, your statement should be terminated with
// a semi-colon.


// Here is a closure that exports an object to window, the global
// scope.

(function(window) {
	
	function log() {
		// do something
	}
	
	function log10() {
		// do something
	}
	
	function killDan() {
		
	}
	
	// Export the functions we want in the namespace 'acousticFns'
	
	window.acousticFns = {
		log10: log10
		killDan: killDan
	};
})(window);


