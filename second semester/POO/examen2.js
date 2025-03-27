class Autor {
    #nombre;
    #apellidos;

    constructor(nombre, apellidos) {
        this.setNombre(nombre);
        this.setApellidos(apellidos);
    }

    setNombre(nombre) {
        if (!nombre || nombre.trim() === '') {
            throw new Error("El nombre no puede estar vacío");
        }
        this.#nombre = nombre.trim();
    }

    setApellidos(apellidos) {
        if (!apellidos || apellidos.trim() === '') {
            throw new Error("Los apellidos no pueden estar vacíos");
        }
        this.#apellidos = apellidos.trim();
    }

    getNombre() {
        return this.#nombre;
    }

    getApellidos() {
        return this.#apellidos;
    }

    mostrarAutor() {
        return `${this.#nombre} ${this.#apellidos}`;
    }
}

class Libro {
    #titulo;
    #isbn;
    #autor;

    constructor(titulo, isbn) {
        this.setTitulo(titulo);
        this.setIsbn(isbn);
    }

    setTitulo(titulo) {
        if (!titulo || titulo.trim() === '') {
            throw new Error("El título no puede estar vacío");
        }
        this.#titulo = titulo.trim();
    }

    setIsbn(isbn) {
        if (!isbn || isbn.trim() === '') {
            throw new Error("El ISBN no puede estar vacío");
        }
        this.#isbn = isbn.trim();
    }

    getTitulo() {
        return this.#titulo;
    }

    agregarAutor(autor) {
        if (!(autor instanceof Autor)) {
            throw new Error("El autor debe ser una instancia válida de Autor");
        }
        this.#autor = autor;
    }

    mostrarLibro() {
        return `Título: ${this.#titulo}, ISBN: ${this.#isbn}, Autor: ${this.#autor.mostrarAutor()}`;
    }
}

class Articulo extends Libro {
    #nombreRevista;

    constructor(titulo, isbn, nombreRevista) {
        super(titulo, isbn);
        this.setNombreRevista(nombreRevista);
    }

    setNombreRevista(nombreRevista) {
        if (!nombreRevista || nombreRevista.trim() === '') {
            throw new Error("El nombre de la revista no puede estar vacío");
        }
        this.#nombreRevista = nombreRevista.trim();
    }

    mostrarLibro() {
        return `${super.mostrarLibro()}, Revista: ${this.#nombreRevista}`;
    }
}

class Biblioteca {
    #listaLibros = [];

    agregarLibro(libro) {
        if (!(libro instanceof Libro)) {
            throw new Error("El elemento debe ser un libro o artículo válido");
        }
        this.#listaLibros.push(libro);
    }

    mostrarBiblioteca() {
        if (this.#listaLibros.length === 0) {
            return "La biblioteca está vacía";
        }
        return this.#listaLibros.map(libro => libro.mostrarLibro()).join('\n');
        //.join es el separador.
    }
    //index 
    borrarLibro(titulo) {
        const index = this.#listaLibros.findIndex(libro => libro.getTitulo() === titulo);
        if (index === -1) {
            throw new Error("Libro no encontrado");
        }
        this.#listaLibros.splice(index, 1);
    }

    contarLibros() {
        return this.#listaLibros.length;
    }
}

// Menú interactivo
const biblioteca = new Biblioteca();

function agregarLibroOArticulo(esArticulo = false) {
    try {
        const titulo = prompt("Ingrese el título:");
        const isbn = prompt("Ingrese el ISBN:");
        const nombreAutor = prompt("Ingrese el nombre del autor:");
        const apellidosAutor = prompt("Ingrese los apellidos del autor:");
        
        let elemento;
        if (esArticulo) {
            const nombreRevista = prompt("Ingrese el nombre de la revista:");
            elemento = new Articulo(titulo, isbn, nombreRevista);
        } else {
            elemento = new Libro(titulo, isbn);
        }
        
        const autor = new Autor(nombreAutor, apellidosAutor);
        elemento.agregarAutor(autor);
        biblioteca.agregarLibro(elemento);
        console.log("Elemento agregado exitosamente");
    } catch (error) {
        console.error("Error:", error.message);
    }
}

function ejecutarMenu() {
    while (true) {
        
        let opcion = prompt(`MENÚ BIBLIOTECA\n1. Agregar libro\n2. Agregar artículo\n3. Mostrar biblioteca\n4. Borrar libro/artículo\n5. Consultar cantidad de libros/artículos\n6. Salir`);
        switch (opcion) {
            case "1":
                agregarLibroOArticulo(false);
                break;
            case "2":
                agregarLibroOArticulo(true);
                break;
            case "3":
                console.log(biblioteca.mostrarBiblioteca());
                break;
            case "4":
                try {
                    const titulo = prompt("Ingrese el título del libro a borrar:");
                    biblioteca.borrarLibro(titulo);
                    console.log("Libro borrado exitosamente");
                } catch (error) {
                    console.error("Error:", error.message);
                }
                break;
            case "5":
                console.log(`Total de elementos: ${biblioteca.contarLibros()}`);
                break;
            case "6":
                console.log("¡Hasta luego!");
                return;
            default:
                console.log("Opción inválida");
        }
    }
}

// Iniciar el menu
ejecutarMenu();