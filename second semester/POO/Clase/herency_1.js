
//Clase 1.

class Boletos{
    constructor(lugar){
        this.lugar = lugar;        
    }
    mostrarlugar(){
        return `El lugar es ${this.lugar}`;
    }
}
class Costo extends Boletos{
    constructor(lugar,costo){
        super(lugar);
        this.costo = costo;
    }
    mostrarInformación(){
        return `${super.mostrarlugar()}, El costo es ${this.costo}`;
    }
}
let cant_boletos = prompt("Ingrese cantidad de tipos de boletos");
let lista = [];

for (let i = 1;i<=cant_boletos;i++) {
    const ticket = new Costo(prompt(`Ingrese lugar ${i}`),prompt(`Ingrese costo ${i}`));    
    lista.push(ticket.mostrarInformación());
}
lista.forEach(tickets => {
    console.log(tickets);
});

//Clase 2

class Time{
    constructor(hora,minutos){
        this.hora = hora;
        this.minutos = minutos;
    }
    tiempoTrabajado(){
        return `El tiempo trabajado es ${this.hora} hora(s) con ${this.minutos} minuto(s)`;
    }
}
class CostoHora extends Time{
    constructor(hora,minutos,costo){
        super(hora,minutos);
        this.costo = costo;
    }
    mostrarCosto(){
        return `El costo por hora es de $ ${this.costo} pesos`;
    }
    costoCalculado(){
        return `El pago total es $ ${(this.costo*this.hora)+(this.costo*(this.minutos/60))}`;
    }
} 
class Trabajador extends CostoHora{
    constructor(hora,minutos,costo,nombre){
        super(hora,minutos,costo);
        this.nombre = nombre;
    }
    mostrarPago(){
        return `${this.nombre}\n ${super.tiempoTrabajado()}\n ${super.costoCalculado()}`;
    }
}

const trabajador1 = new Trabajador(prompt("Ingrese horas trabajadas"),prompt("Ingrese minutos trabajados"),prompt("Ingrese costo por hora en pesos $"),prompt("Ingrese nombre de trabajador"));
console.log(trabajador1.mostrarPago());
console.log(trabajador1.mostrarCosto());

//En proceso aun no funciona el ciclo jajaja

/*

// Clase 3

class Comida{
    constructor(cantidad,costo){
        this.cantidad = cantidad;
        this.costo =costo;
    }
    
} 
class Vegetariana extends Comida{
   constructor(nombre, cantidad, costo){
    this.nombre = nombre;
    super(cantidad);
    super(costo);
   } 
   mostrarVeg(){
    return`${this.nombre} = ${super.cantidad()}`
   }
   mostrarcostoVeg(){
    return `${this.nombre} = ${super.costo} por c/u`
   }
}
class Omnivoros extends Comida{
    constructor(nombre, cantidad){
     this.nombre = nombre;
     super(cantidad);
     super(costo);
    } 
    mostrarOmn(){
        return`${this.nombre} = ${super.cantidad()}`
    }
    mostrarcostoOmn(){
        return `${this.nombre} = ${super.costo} por c/u`
       }
 }
 
let cantidad_platillos = prompt("Ingresa la cantidad de platillos (numero par)");
let espacios =  (cantidad_platillos/2)
let menu = []; 
menu.push=("Vegetariano");

do {
    // Add vegetarian dishes
    for (let i = 1; i <= espacios; i++) {
        const platillo = new Vegetariana(
            prompt("Ingresa el nombre del platillo Vegetariano"),
            prompt("Ingresa la cantidad disponible"),
            prompt("Ingresa el costo")
        );
        menu.push(platillo.mostrarVeg());
        menu.push(platillo.mostrarcostoVeg());
    }

    // Add omnivore section header
    menu.push("Omnivoro");

    // Add omnivore dishes
    for (let i = 1; i <= espacios; i++) {
        const platillo = new Omnivoros(
            prompt("Ingresa el nombre del platillo Omnivoro"),
            prompt("Ingresa la cantidad disponible"),
            prompt("Ingresa el costo")
        );
        menu.push(platillo.mostrarOmn());
        menu.push(platillo.mostrarcostoOmn());
    }

    let ver_menu = prompt("¿Consultar menu? (si/no)");

    if (ver_menu.toLowerCase() === "si") {
        alert("Menu");
        menu.forEach(comida => {
            alert(comida);
        });
    } else {
        alert("Gracias");
    }

    const continuar = prompt("¿Desea agregar más platillos? (si/no)");
    if (continuar.toLowerCase() !== "si") {
        break;
    }
    
} while (true);
*/