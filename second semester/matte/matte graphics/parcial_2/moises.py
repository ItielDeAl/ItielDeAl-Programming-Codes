import tkinter as tk

#Interfaaaas===================================================================================
#ventana de la interfas
ventana = tk.Tk()
ventana.title("Calculador de Newton-Raphson")#titulo de la ventana.
ventana.geometry("600x600")#Tamaño de la vetana. 


# Crear una etiqueta para el título
titulo = tk.Label(ventana, text="Calculadora", font=("Arial", 16, "bold"))
titulo.pack(pady=10)

# Crear un marco para organizar los widgets
frame = tk.Frame(ventana)
frame.pack(pady=10)

# Etiqueta de la función
etiqueta_funcion = tk.Label(frame, text="Ingresa la función f(x): ", font=("Arial", 12))
etiqueta_funcion.grid(row=0, column=0, sticky="w", padx=5)
# Crear una entrada de texto
entrada_funcion = tk.Entry(frame, width=20)
entrada_funcion.grid(row=0, column=1, padx=5)


# Etiqueta de valor inicial
etiqueta_aprox = tk.Label(frame, text="Ingresa la aproximacion inicial: ", font=("Arial", 12))
etiqueta_aprox.grid(row=1, column=0, sticky="w", padx=5)
# Crear una entrada de texto
entrada_aprox = tk.Entry(frame, width=20)
entrada_aprox.grid(row=1, column=1, padx=5)


# Etiqueta margen de error
etiqueta_error = tk.Label(frame, text="Ingresa el margen de error ", font=("Arial", 12))
etiqueta_error.grid(row=2, column=0, sticky="w", padx=5)
# Crear una entrada de texto
entrada_error = tk.Entry(frame, width=20)
entrada_error.grid(row=2, column=1, padx=5)



# Crear un marco para mostrar resultados::::::::::::::::::::::::
frame_resultados = tk.Frame(ventana)
frame_resultados.pack(pady=10)


#TABLA:::::::::::::::::::::::::::::::::::::::::::::::::::::::
# Etiquetas nombres
etiqueta_resultado1 = tk.Label(frame_resultados, text="I", font=("Arial", 12))
etiqueta_resultado1.grid(row=0, column=0, sticky="w", padx=5)

etiqueta_resultado2 = tk.Label(frame_resultados, text="r0", font=("Arial", 12))
etiqueta_resultado2.grid(row=0, column=1, sticky="w", padx=5)

etiqueta_resultado3 = tk.Label(frame_resultados, text="ra", font=("Arial", 12))
etiqueta_resultado3.grid(row=0, column=2, sticky="w", padx=5)

etiqueta_resultado4 = tk.Label(frame_resultados, text="e", font=("Arial", 12))
etiqueta_resultado4.grid(row=0, column=3, sticky="w", padx=5)



resultado1 = tk.Label(frame_resultados, text="", font=("Arial", 12))
resultado1.grid(row=1, column=0, padx=5)

resultado2 = tk.Label(frame_resultados, text="", font=("Arial", 12))
resultado2.grid(row=1, column=1, padx=5)

# Función para mostrar los resultados
def mostrar_resultados():
    texto = entrada_funcion.get()  # Obtener el texto de la entrada
    resultado1.config(text=f"Hola, {texto}!")  # Mostrar resultado 1
    resultado2.config(text=f"Longitud: {len(texto)}")  # Mostrar resultado 2

# Crear un botón para mostrar los resultados
boton = tk.Button(ventana, text="Mostrar resultados", command=mostrar_resultados)
boton.pack(pady=10)

# Iniciar el bucle de la interfaz
ventana.mainloop()
"""
import sympy as sp

# Definir la función y su derivada
x = sp.symbols('x')
y = sp.sympify(input("Ingresa la función f(x): "))
derivada = sp.diff(y, x)


def newton_raphson(x0, tolerancia = 1e-6, max_iter = 30, error_absoluto = float('inf')):
    iteraciones = 0 # Inicializar el contador de iteraciones

    #mietras el error absoluto sea mayor que la tolerancia y el número de iteraciones no supere el máximo
    if iteraciones < max_iter:
        print("I          rR             rR+1           Error")
        while error_absoluto > tolerancia:
            try:
                x1 = x0 - ((y.subs(x, x0)) / derivada.subs(x, x0)) # Calcular el nuevo valor de x
                error_absoluto = abs(x1 - x0) # Calcular el error absoluto
                print(f"{iteraciones} {x0} {x1} {error_absoluto}")
                x0 = x1 # Actualizar el valor de x0
                iteraciones += 1 # Incrementar el contador de iteraciones
            
            except ZeroDivisionError:
                print("La derivada es cero. No se puede continuar.")
                return None
        if error_absoluto <= tolerancia:
            print(f"Iteraciones: {iteraciones}")
        else:
            print("El método no converge.")

# Definir el valor inicial y ejecutar el método
x0 = float(input("Ingresa el valor inicial: ")) # Convertir a float
# Llamar a la función
newton_raphson(x0)
"""