const Stack = require("./stack/stack");
const Queue = require("./queue/queue");


console.log('Sección I: Ejercicios de estructura de datos Pila------------------------------------\n');

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


console.log('  Palabra revertida usando pila--------------------------------------------');
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

console.log('Sección II: Ejercicios de estructura de datos Cola------------------------------------\n');
console.log('Ejercicio 1 Clasificación de Palabras por Letra con Colas Enlazadas--------');

function clusters(str) {
  let cluster = {};
  let palabras = str.split(' ');//separamos por palabras

  for (const palabra of palabras) {
    //Tomamos la primer letra y la convertimos en minuscula para sui comparación
    let letra = palabra[0].toLowerCase();

    //si tenemos un doble espacio se tendra un '' y no se podra encolar
    //si esta vacia la saltamos
    if (!palabra) {
      continue;
    }

    // Comprobación de letra
    if (letra < 'a' || letra > 'z') {
      continue;
    }

    // Creación de cola
    if (!cluster[letra]) {
      cluster[letra] = new Queue();
      cluster[letra].enqueue(`-${letra.toUpperCase()}`); 
    }
    //se agrega a la cola.
    cluster[letra].enqueue(palabra);
  }

  // Object.keys devuelve las llaves. y el .sort() las ordena de manera alfabetica.
  const works = Object.keys(cluster).sort();
  console.log('--- Resultados de la Clasificación ---');
  for (let letra of works) {
    cluster[letra].printQueue();
    console.log('');
  }
}


clusters("Ana Banana Cebra Dedo Elefante Foca Gato Hilo Iman Jirafa Koala Leon Manzana Nido Oso Perro Queso Raton Sapo Tigre Uva Vaca Wombat Xilofono Yate Zebra anaconda barco nariz casa elfo");

console.log('Ejercicio 2 Simulación de Supermercado con Colas Enlazadas-----------------');

function supermarket(num){
  //colas a utilizar
  const espera = new Queue();
  const carritos = new Queue();
  //cajas del super
  const caja1 = new Queue();
  const caja2 = new Queue();
  const caja3 = new Queue();

  //cantidad de carritos en el super
  for(let carrito = 1; carrito <= 25; carrito ++){
    carritos.enqueue(carrito);
  }

  let customers = parseInt(num);
  //Los clientes siempre inicia en espera
  //cuando no hay nadie, pasan directo
  for(let i = 1; i <= customers; i++){
    espera.enqueue(i);
  }
  
  //declaramos las cajas, de esta manera podremos agregar mas cajas sin afectar lo delas 
  const todasLasCajas = [
  { id: 1, cola: caja1 },
  { id: 2, cola: caja2 },
  { id: 3, cola: caja3 },
];

// 2. Creamos una función reutilizable para encontrar la caja más corta
function encontrarCajaMasCorta() {
  // Empezamos asumiendo que la primera es la más corta
  let cajaMasCorta = todasLasCajas[0];

  // Recorremos el resto para comparar
  for (let i = 1; i < todasLasCajas.length; i++) {
    if (todasLasCajas[i].cola.sized() < cajaMasCorta.cola.sized()) {
      cajaMasCorta = todasLasCajas[i];
    }
  }
  return cajaMasCorta;
}

while (
  !espera.isEmpty() || !caja1.isEmpty() || !caja2.isEmpty() || !caja3.isEmpty()) {
  
  // atender cleintes
  // Usamos un bucle para pasar por las cajas
  todasLasCajas.forEach(caja => {
    if (!caja.cola.isEmpty()) {
      let atendido = caja.cola.dequeue();
      carritos.enqueue(atendido.carrito);
      console.log(`Cliente ${atendido.cliente} terminó en caja ${caja.id} y devolvió carrito ${atendido.carrito}`);
    }
  });

  // clientes a cajas
  while (!espera.isEmpty() && !carritos.isEmpty()) {
    // Sacar un cliente de espera y un carrito (esto no cambia)
    let cliente = espera.dequeue();
    let carrito = carritos.dequeue();
    let asignacion = { cliente: cliente, carrito: carrito };

    // Encontrar la caja con menos gente (lógica nueva y limpia)
    let cajaDestino = encontrarCajaMasCorta();

    // Asignar a la caja encontrada
    cajaDestino.cola.enqueue(asignacion);
    console.log(`Cliente ${cliente} va a caja ${cajaDestino.id}`);
  }

  console.log(`Carritos disponibles: `);
  carritos.printQueue();
}
}
supermarket(100);

console.log('');

console.log('Ejercicio 3 Actualización de Lista de Repartidores con Colas Enlazadas-----');
//se usa una lista enlazada para guardar a los repartidores.

class ListaRepartidores {
 constructor() {
    this.head = null;
 }
  //nuemvos metodos para ocupar
  actualizarybuscar(nss){
    let current = this.head;
    while (current) {
      if (current.value.NSS === nss) {
        // Encontrado: Actualizar días y terminar
        current.value.días++;
        return true;
      }
      current = current.next;
    }
    // No encontrado
    return false;
  }

  insertRepartidor(repartidorData) {
    const newNode = new Node(repartidorData);

    // Caso 1: La lista está vacía o el nuevo nodo debe ser la cabeza
    if (!this.head || this.head.value.NSS > newNode.value.NSS) {
      newNode.next = this.head;
      this.head = newNode;
      return;
    }

    // Caso 2: Insertar en medio o al final
    let current = this.head;
    while (current.next && current.next.value.NSS < newNode.value.NSS) {
      // Avanzamos hasta encontrar el lugar de inserción
      current = current.next;
    }

    // Insertamos el nuevo nodo
    newNode.next = current.next;
    current.next = newNode;
  }
  printList() {
    let current = this.head;
    let result = [];
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    // Usamos JSON.stringify para una salida bonita, similar al ejemplo
    console.log(JSON.stringify(result, null, 2));
}
}
const Node = require('./queue/node');

const listaPrincipal = new ListaRepartidores();
// Insertamos los datos iniciales (ya ordenados)
listaPrincipal.insertRepartidor({ NSS: 101, nombre: "Carlos", días: 3 });
listaPrincipal.insertRepartidor({ NSS: 103, nombre: "Lucía", días: 5 });

console.log("--- Lista Inicial ---");
listaPrincipal.printList();
// 2. Crear la cola del día y llenarla
const colaDelDia = new Queue();
// El 'value' en la cola será un objeto con los datos del día
colaDelDia.enqueue({ nss: 102, entidad: "EmpresaX" });
colaDelDia.enqueue({ nss: 101, entidad: "EmpresaY" });
colaDelDia.enqueue({ nss: 104, entidad: "EmpresaZ" });

console.log("\n--- Procesando la cola... ---");

// 3. Procesar la cola y actualizar la lista
while (!colaDelDia.isEmpty()) {
  const trabajo = colaDelDia.dequeue();
  const nssBuscado = trabajo.nss;

  console.log(`Procesando NSS: ${nssBuscado}`);

  // Regla 4: Intentar encontrar y actualizar
  // !! CORRECCIÓN AQUÍ !!
  // Llama al método que SÍ busca y actualiza
  const fueActualizado = listaPrincipal.actualizarybuscar(nssBuscado);

  // Regla 3: Si no se actualizó (es decir, actualizarybuscar devolvió false)
  if (!fueActualizado) {
    console.log(` -> ${nssBuscado} no encontrado. Insertando...`);
    const nuevoRepartidor = {
      NSS: nssBuscado,
      nombre: "Nuevo", // Como pide el ejemplo
      días: 1,         // Es su primer día registrado
    };
    // Llama al método de insertar SÓLO si es nuevo
    listaPrincipal.insertRepartidor(nuevoRepartidor);
  } else {
    console.log(` -> ${nssBuscado} encontrado. Días incrementados.`);
  }
}

// 5. Mostrar la lista final
console.log("\n--- Lista Final Actualizada ---");
listaPrincipal.printList();