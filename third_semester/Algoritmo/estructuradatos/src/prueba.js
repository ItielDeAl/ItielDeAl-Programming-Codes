// index.js

// 1. Importar tu clase Queue
const Queue = require('./queue/queue'); // Asegúrate que 'queue.js' esté en la misma carpeta

console.log('Ejercicio 1 Clasificación de Palabras por Letra con Colas Enlazadas--------');

function cluster(str) {
  // Usamos un objeto para 'mapear' la letra (llave) a su cola (valor)
  // Es mucho más eficiente que 26 variables separadas.
  const clusters = {}; // Ejemplo: { "A": Queue, "B": Queue, ... }

  const words = str.split(' '); // Separar el string en un array de palabras

  for (const word of words) {
    // Saltar si hay espacios dobles (lo que crea una palabra vacía)
    if (!word) continue; 

    // 1. Obtener y normalizar la primera letra a mayúscula
    const firstLetter = word[0].toUpperCase();

    // 2. Validar que es una letra de A-Z
    // (Ignoramos números, puntos, comas, etc.)
    if (firstLetter < 'A' || firstLetter > 'Z') {
      continue; 
    }

    // 3. Crear la cola si es la primera vez que vemos esta letra
    // Si clusters[firstLetter] no existe (!clusters[firstLetter]), lo creamos.
    if (!clusters[firstLetter]) {
      clusters[firstLetter] = new Queue();
      
      // Opcional: Agregar la letra como "título" de la cola,
      // que parece ser lo que intentabas con queueA.enqueue(A)
      clusters[firstLetter].enqueue(`--- Palabras con ${firstLetter} ---`);
    }

    // 4. Agregar la palabra a la cola correspondiente
    clusters[firstLetter].enqueue(word);
  }

  // 5. Imprimir todas las colas que SÍ tienen palabras
  console.log("--- Resultados de la Clasificación ---");
  
  // Obtenemos las letras (llaves) que usamos y las ordenamos
  // para que la salida sea A, B, C...
  const sortedLetters = Object.keys(clusters).sort();
  
  // Iteramos sobre las letras ordenadas y pedimos a cada cola que se imprima
  for (const letter of sortedLetters) {
    clusters[letter].printQueue();
    console.log(""); // Añadir un espacio para mejor legibilidad
  }
}

// --- Ejemplo de uso ---
const miFrase = "Ana Banana Cebra Dedo Elefante Foca Gato Hilo Iman Jirafa Koala Leon Manzana Nido Oso Perro Queso Raton Sapo Tigre Uva Vaca Wombat Xilofono Yate Zebra anaconda";

cluster(miFrase);

// Ejemplo con palabras desordenadas y minúsculas
const miFrase2 = "perro gato ardilla Zorro burro Caballo";
cluster(miFrase2);