
import tkinter as tk  #  interfaz gráfica
import sympy as sp    #  expresiones simbólicas
import numpy as np     #  funciones matemáticas
import matplotlib.pyplot as plt  #  graficar

# Definimos la variable simbólica 'x'
x = sp.Symbol('x')

def newton_raphson(x0, y, derivada, tolerancia=1e-6, max_iter=30):
    
    iteraciones = 0  # Contador de iteraciones
    error_absoluto = float('inf')  # Inicializamos el error absoluto
    puntos = []  # Lista para almacenar los puntos (x, f(x))
    resultados = []  # Lista para almacenar los resultados de cada iteración

    # Bucle que se ejecuta mientras no se alcance el número máximo de iteraciones y el error sea mayor que la tolerancia
    while iteraciones < max_iter and error_absoluto > tolerancia:
        try:
            # Calculamos el siguiente valor x1 usando la fórmula de Newton-Raphson
            x1 = x0 - (y.subs(x, x0) / derivada.subs(x, x0))
            error_absoluto = abs(x1 - x0)  # Calculamos el error absoluto
            puntos.append((x0, y.subs(x, x0)))  # Guardamos el punto actual
            resultados.append((iteraciones, x0, x1, error_absoluto))  # Guardamos los resultados de la iteración
            x0 = x1  # Actualizamos x0 para la siguiente iteración
            iteraciones += 1  # Incrementamos el contador de iteraciones
        except ZeroDivisionError:  # Capturamos la excepción si hay división por cero
            return None, None  # Retornamos None si ocurre un error

    return resultados, puntos  # Retornamos los resultados y los puntos

def calcular():
    """
    Función que se ejecuta al presionar el botón "Calcular". 
    Obtiene los valores de entrada y llama a la función newton_raphson.
    """
    try:
        # Obtenemos los valores de entrada del usuario
        funcion = entrada_funcion.get()  # Función ingresada por el usuario
        x0 = float(entrada_aprox.get())  # Aproximación inicial
        tolerancia = float(entrada_error.get())  # Margen de error

        # Creamos la función simbólica y su derivada
        y = sp.sympify(funcion)  # Convertimos la cadena de texto a una expresión simbólica
        derivada = sp.diff(y, x)  # Calculamos la derivada de la función

        # Llamamos a la función newton_raphson
        resultados, puntos = newton_raphson(x0, y, derivada, tolerancia)

        # Limpiamos resultados anteriores en el área de texto
        texto_resultados.delete(1.0, tk.END)

        if resultados:  # Si hay resultados, los mostramos
            # Mostramos resultados en formato de tabla
            texto_resultados.insert(tk.END, "i\tRi\tRi+1\tError\n")
            texto_resultados.insert(tk.END, "-" * 50 + "\n")
            for i, r0, r1, error in resultados:
                texto_resultados.insert(tk.END, f"{i}\t{r0:.6f}\t{r1:.6f}\t{error:.6f}\n")

            # Almacenamos resultados para graficar
            global datos_grafica
            datos_grafica = (puntos, y)  # Guardamos los puntos y la función
        else:
            texto_resultados.insert(tk.END, "Error: División por cero")  # Mensaje de error si no hay resultados

    except Exception as e:  # Capturamos cualquier excepción
        texto_resultados.delete(1.0, tk.END)  # Limpiamos el área de resultados
        texto_resultados.insert(tk.END, f"Error: {str(e)}")  # Mostramos el mensaje de error

def mostrar_grafica():
    """
    Función que se ejecuta al presionar el botón "Mostrar Gráfica".
    Grafica la función y los puntos de iteración.
    """
    if hasattr(globals(), 'datos_grafica'):  # Verificamos si hay datos para graficar
        puntos, y = datos_grafica  # Obtenemos los puntos y la función
        if puntos:  # Si hay puntos, procedemos a graficar
            # Convertimos los puntos a arrays de numpy
            puntos = np.array(puntos)
            # Generamos valores x para la gráfica
            x_vals = np.linspace(float(puntos[0][0]) - 2, float(puntos[-1][0]) + 2, 400)
            # Calculamos los valores y correspondientes
            y_vals = [float(y.subs(x, val)) for val in x_vals]

            # Creamos la gráfica
            plt.figure(figsize=(10, 6))  # Tamaño de la figura
            plt.plot(x_vals, y_vals, 'b-', label='f(x)')  # Graficamos la función
            plt.plot(puntos[:, 0], puntos[:, 1], 'ro', label='Iteraciones')  # Graficamos los puntos de iteración
            
            plt.grid(True)  # Activamos la cuadrícula
            plt.axhline(y=0, color='k', linestyle='-', alpha=0.3)  # Línea horizontal en y=0
            plt.axvline(x=0, color='k', linestyle='-', alpha=0.3)  # Línea vertical en x=0
            
            plt.title("Método de Newton-Raphson")  # Título de la gráfica
            plt.xlabel("x")  # Etiqueta del eje x
            plt.ylabel("y")  # Etiqueta del eje y
            plt.legend()  # Mostramos la leyenda
            plt.show()  # Mostramos la gráfica

# Creamos la ventana principal
ventana = tk.Tk()
ventana.title("Método de Newton-Raphson")  # Título de la ventana
ventana.geometry("600x500")  # Dimensiones de la ventana

# Creamos un marco para las entradas
frame_entrada = tk.Frame(ventana)
frame_entrada.pack(pady=20)  # Espaciado vertical

# Etiquetas y campos de entrada
tk.Label(frame_entrada, text="Función f(x):").grid(row=0, column=0, padx=5, pady=5)  # Etiqueta para la función
entrada_funcion = tk.Entry(frame_entrada, width=30)  # Campo de entrada para la función
entrada_funcion.grid(row=0, column=1, padx=5, pady=5)  # Posicionamos el campo

tk.Label(frame_entrada, text="Aproximación inicial:").grid(row=1, column=0, padx=5, pady=5)  # Etiqueta para la aproximación
entrada_aprox = tk.Entry(frame_entrada, width=30)  # Campo de entrada para la aproximación
entrada_aprox.grid(row=1, column=1, padx=5, pady=5)  # Posicionamos el campo

tk.Label(frame_entrada, text="Margen de error:").grid(row=2, column=0, padx=5, pady=5)  # Etiqueta para el margen de error
entrada_error = tk.Entry(frame_entrada, width=30)  # Campo de entrada para el margen de error
entrada_error.grid(row=2, column=1, padx=5, pady=5)  # Posicionamos el campo

# Creamos un marco para los botones
frame_botones = tk.Frame(ventana)
frame_botones.pack(pady=10)  # Espaciado vertical

# Botones para calcular y mostrar la gráfica
tk.Button(frame_botones, text="Calcular", command=calcular).pack(side=tk.LEFT, padx=5)  # Botón para calcular
tk.Button(frame_botones, text="Mostrar Gráfica", command=mostrar_grafica).pack(side=tk.LEFT, padx=5)  # Botón para mostrar gráfica

# Área de texto para mostrar resultados
texto_resultados = tk.Text(ventana, height=15, width=50)  # Creamos el área de texto
texto_resultados.pack(pady=20)  # Posicionamos el área de texto
ventana.mainloop()  # Iniciamos el bucle principal de la interfaz
