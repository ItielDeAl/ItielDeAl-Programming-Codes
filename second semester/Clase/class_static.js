/*
class Persona{
    static contador = 0;
    
    constructor (nombre,edad){
        this.nombre = nombre;
        this.edad = edad;
        Persona.contador++;
    }
    mostrarInformacion(){
        return `nombre ${this.nombre}, Edad: ${this.edad}`;
    }
    static obtenerTotalPersonas(){
        return Persona.contador;
    }
}
//Creacion de objeto personal
for (let i = 0; i < 3; i++) {
    
    const persona1 = new Persona(prompt("ingresa tu nombre"), prompt("ingresa tu edad"))
    console.log(persona1.mostrarInformacion());
}


console.log(`Total de personal ${Persona.obtenerTotalPersonas()}`);
*/
let contador1 = prompt("Ingresa el cupo del salon")

console.log(`Total del cupo ${contador1}`);

class Salon{
    static contador = contador1;
    
    constructor (nombre){
        this.nombre = nombre;
        Salon.contador--;
    }
    mostrarAlumno(){
        return `nombre ${this.nombre}`;
    }
    static obtenerTotalAlumnos(){
        return Salon.contador;
    }
}

//Creacion de objeto personal
for (contador1; contador1 >= 0; contador1--){
     
    if (contador1 > 0) {
        const persona1 = new Salon(prompt("ingresa tu nombre"))
        console.log(persona1.mostrarAlumno());
        console.log(`Espacios ${Salon.obtenerTotalAlumnos()}`);
        
    } else {
        
        alert("Cupo lleno");
    }  
}

