class SortingAlgorithms {

    // Bubble Sort
    static bubbleSort(array) {
        let n = array.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    let temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
    }

    // Merge Sort
    static mergeSort(array) {
        if (array.length <= 1) return array;
        let mid = Math.floor(array.length / 2);
        let left = array.slice(0, mid);
        let right = array.slice(mid);
        left = this.mergeSort(left);
        right = this.mergeSort(right);
        return this.merge(left, right);
    }

    static merge(left, right) {
        let result = [];
        let i = 0, j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i++]);
            } else {
                result.push(right[j++]);
            }
        }
        while (i < left.length) {
            result.push(left[i++]);
        }
        while (j < right.length) {
            result.push(right[j++]);
        }
        return result;
    }

    // Quick Sort
    static quickSort(array, low = 0, high = array.length - 1) {
        if (low < high) {
            let pi = this.partition(array, low, high);
            this.quickSort(array, low, pi - 1);
            this.quickSort(array, pi + 1, high);
        }
    }

    static partition(array, low, high) {
        let pivot = array[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (array[j] < pivot) {
                i++;
                let temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
        }
        let swapTemp = array[i + 1];
        array[i + 1] = array[high];
        array[high] = swapTemp;
        return i + 1;
    }
}

// Función para generar array aleatorio
function generateRandomArray(size, min = 1, max = 200000) {
    let array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

// Función para medir tiempo en ticks
function measureTime(algorithm, array, algorithmName) {
    let arrayCopy = [...array];
    let start = process.hrtime.bigint();

    algorithm(arrayCopy);

    let end = process.hrtime.bigint();
    let timeTicks = end - start;

    console.log(`${algorithmName}: ${timeTicks} ticks`);
    return { time: timeTicks, sortedArray: arrayCopy };
}

// Configuración
const arraySize = 150000;
const testArray = generateRandomArray(arraySize);

console.log("\n⏰ Measuring execution time in ticks:\n");

// Medir tiempos
const bubbleResult = measureTime(SortingAlgorithms.bubbleSort, testArray, "Bubble Sort");
const mergeResult = measureTime(arr => SortingAlgorithms.mergeSort(arr), testArray, "Merge Sort");

// Para Quick Sort
let quickArrayCopy = [...testArray];
let quickStart = process.hrtime.bigint();
SortingAlgorithms.quickSort(quickArrayCopy);
let quickEnd = process.hrtime.bigint();
let quickTime = quickEnd - quickStart;

console.log(`Quick Sort: ${quickTime} ticks`);


console.log("\n📊 Results:");
console.log(`Bubble Sort: ${bubbleResult.time} ticks`);
console.log(`Merge Sort: ${mergeResult.time} ticks`);
console.log(`Quick Sort: ${quickTime} ticks`);