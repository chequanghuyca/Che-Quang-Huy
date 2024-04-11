// Provide 3 unique implementations of the following function in JavaScript.
// Input: `n` - any integer
// Assuming this input will always produce a result lesser than`Number.MAX_SAFE_INTEGER`.
// Output: `return` - summation to`n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.


// Using a for loop
// The for loop is often the most intuitive and readable approach.
var sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};


// Using recursion
// Recursion can be elegant and concise, but might be less efficient for large inputs due to function call overhead.
var sum_to_n_b = function (n) {
    if (n === 1) {
        return 1;
    } else {
        return n + sum_to_n_b(n - 1);
    }
};


// Using the arithmetic series formula
// The formula is the most efficient in terms of computation, but might be less readable for those unfamiliar with the arithmetic series formula.
var sum_to_n_c = function (n) {
    return (n * (n + 1)) / 2;
};
