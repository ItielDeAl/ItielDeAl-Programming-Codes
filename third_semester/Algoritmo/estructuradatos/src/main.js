const Stack = require("./stack/stack");

console.log('Sección I: Ejercicios de estructura de datos Pila--------------------------\n');

console.log('Ejercicio 1 Evaluar expresión postfija (RPN)-------------------------------');

function postfija(str) {
  const stack = new Stack();
//Dividir el string 
  const tokens = str.split(' ');

  //Iterar sobre cada caracter
  for (const token of tokens) {
    
    //convertir el token a un número
    const num = parseFloat(token);

    if (!isNaN(num)) {
      // Si es un número, lo metemos en la pila
      stack.push(num);
    } else {
      // Si NO es un número, es u operador
      
      //Sacar los dos últimos operandos
      const operand2 = stack.pop();
      const operand1 = stack.pop();

      // Verificar si había suficientes operandos en la pila
      if (operand1 === null || operand2 === null) {
        return "Error: Expresión malformada (operandos insuficientes)";
      }

      let result;
      // Realizar la operación
      switch (token) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case '/':
          if (operand2 === 0) {
            return "Error: División por cero";
          }
          result = operand1 / operand2;
          break;
        default:
          return `Error: Operador desconocido '${token}'`;
      }
      
      // Agregamos el resultado a la pila
      stack.push(result);
    }
  }

  //Obtener el resultado final
  const finalResult = stack.pop();

  // Al final, la pila debe tener un resultado.
  // Si está vacía, algo salió mal
  if (finalResult === null) {
    return "Error: Expresión vacía o inválida";
  }

  // Si la pila no está vacía después de sacar el resultado,
  // significa que sobraron operandos (expresión malformada).
  if (!stack.isEmpty()) {
    return "Error: Expresión malformada (operandos sobrantes)";
  }

  return `${str} Calculado -> ${finalResult} \n`;
}

console.log(postfija('2 3 + 2 *'));

/////////////////////////////////////////////////////Convertir una Infija a postfija.
// --- NECESITAS UNA FUNCIÓN DE AYUDA ---
// No podemos evitarlo, necesitamos saber la "fuerza" (precedencia)
console.log('Ejercicio 2 Convertir infija a postfija------------------------------------');

function precedencia(op) {
  if (op === '*' || op === '/') {
    return 2; // Fuerza alta
  }
  if (op === '+' || op === '-') {
    return 1; // Fuerza baja
  }
  return 0; // Para paréntesis
}

function inposfija(infija) {
  const stack = new Stack();
  //Resultado final
  let postfija = []; 
  //separamos los caracteres
  const expresion = infija.split(' ');

  for (const token of expresion) {
    
    if (!isNaN(token)) {
      //Si es numero va directo
      postfija.push(token);

    } else if (token === '(') {
      // --- REGLA 2: Es un paréntesis ( ---
      // Siempre se mete a la pila, sin preguntar
      stack.push(token);

    } else if (token === ')') {
    // Sacar todo de la pila HASTA encontrar el (
      while (!stack.isEmpty() && stack.peek() !== '(') {
        postfija.push(stack.pop());
      }
      stack.pop(); // Saca y descarta el (

    } else {
      
      // Mientras la pila NO esté vacía Y
      // el operador del tope sea "más fuerte" o "igual de fuerte" que el token
      while (!stack.isEmpty() && precedencia(stack.peek()) >= precedencia(token)) {
        // Saca el operador "fuerte" del tope y ponlo en la salida
        postfija.push(stack.pop());
      }
      
      // Ahora sí, mete el token (operador nuevo) a la pila
      stack.push(token);
    }
  }

  // Vaciamos lo que quede en la pila (los últimos operadores)
  while (!stack.isEmpty()) {
    postfija.push(stack.pop());
  }
  
  // se convierte en str
  return `${infija} convertido -> ${postfija.join(' ')} \n`;
}
console.log(inposfija('( 5 + 9 ) * 2'));

/////////////////////////Verificar si es un palindromo
console.log('Ejercicio 3 Verificar palíndromo-------------------------------------------');

function palindrome(str) {
  const stack = new Stack();
  let size = str.length
  let lap = []
  for(const palindromo of str){
    stack.push(palindromo)
  }
  for(let i = 0; i<= size; ++i){
    lap.push(stack.pop())
  }
  lap = lap.join('')
  //console.log(str);
  //console.log(lap);
  
  //se convierten a minusculas para una mejor comparación
  if(str.toLowerCase() === lap.toLowerCase()){
    return `${str} es un palindromo \n`
  }else{
    return `${str} no es un palindromo \n`
  }
}
console.log(palindrome('Cristian'));


console.log('10  Palabra revertida usando pila------------------------------------------');
function revert(str) {
  const stack = new Stack();
  let size = str.length
  let reversa = []
  for(const letra of str){
    stack.push(letra)
  }
  for (let i = 0; i<= size; ++i){
    reversa.push(stack.pop())
  }
  reversa = reversa.join('')
  return `${str} revertido -> ${reversa} \n`
}

console.log(revert('acido desoxirribonucleico'));
