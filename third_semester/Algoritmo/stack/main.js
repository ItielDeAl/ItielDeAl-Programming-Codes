const Stack = require("./stack");

//Convertir decimal a binario

function decimalBinario(number){
    const stack = new Stack();
    let dc = number
    
    while (dc>0) {
        stack.push(dc%2);
        dc = Math.floor(dc / 2);
    } 
    let binary = "";

    while (!stack.isEmpty()) {
        binary += stack.pop()
    }
    
    return binary;
    
}


console.log(decimalBinario(10));
