// isEven Function

function isEven(num){
    if(typeof num === "number" && num % 2 === 0) {
        return true;
    } else {
        return false;
    }
}

// factorial Function

function factorial(num){
    var product = 1;

    while (num > 0){
        product *= num;
        num--;
    }

    return product;
}

//kebabToSnake Function

function kebabToSnake(str){
    return str.replace(/-/g, "_");
}

//OUTPUT

console.log(isEven(78));
console.log(isEven(65));
console.log(isEven("test"));

console.log(factorial(0));
console.log(factorial(3));
console.log(factorial(5));
console.log(factorial(8));

console.log(kebabToSnake("this-is-my-sample-text"));