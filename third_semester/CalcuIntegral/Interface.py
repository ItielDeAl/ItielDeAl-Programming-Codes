import tkinter as tk
import numpy as np
import sympy as sp
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg

def calcular():
    # Obtener valores de entrada
    y = entrada_funcion.get()
    a = float(inferior.get())
    b = float(superior.get())
    m = int(rectangulo.get())
    x = sp.symbols('x')  # Definir la variable simbólica
    f = sp.sympify(y)  # Convertir la entrada del usuario a una función simbólica

    # Calcular la integral usando el método de integración simbólica
    I = sp.integrate(f, (x, a, b))
    Integracion = I.evalf()
    print('El valor de la integral simbólica es:', Integracion)
    texto_resultados.insert(tk.END, f"El valor de la integral simbólica es:\n {Integracion}\n")

    # Cálculo del ancho del intervalo
    h = (b - a) / m
    # Crear los puntos x
    x_values = np.linspace(a, b, m + 1)

    # Inicializar la integral
    integral = 0

    # Calcular la integral usando el método del trapecio
    for i in range(m):
        desc = (x_values[i] + x_values[i + 1]) / 2
        integral += f.subs(x, desc) * h

    print('El valor aproximado de la integral es:', integral)
    texto_resulta2.insert(tk.END, f"El valor aproximado de la integral es:\n {integral}\n")

def graficar():
    y = entrada_funcion.get()
    a = float(inferior.get())
    b = float(superior.get())
    m = int(rectangulo.get())
    x = sp.symbols('x')  # Definir la variable simbólica
    f = sp.sympify(y)  # Convertir la entrada del usuario a una función simbólica
    
    # Cálculo del ancho del intervalo
    h = (b - a) / m
    # Crear los puntos x
    x_values = np.linspace(a, b, m + 1)

    # Graficar la función
    # Crear un rango de valores para x para la gráfica
    x_plot = np.linspace(a - 1, b + 1, 400)  # Rango extendido para mejor visualización
    y_plot = [f.subs(x, val) for val in x_plot]

    # Limpiar el área de la gráfica antes de dibujar
    for widget in frame_grafica.winfo_children():
        widget.destroy()

    # Crear la figura y el lienzo
    figura = Figure(figsize=(10, 6), dpi=100)
    ejes = figura.add_subplot(111)
    ejes.plot(x_plot, y_plot, label=f'f(x) = {y}', color='blue')

    # Graficar líneas verticales desde a hasta b
    for i in range(m + 1):
        x_line = a + i * h  # Calcular la posición x de la línea
        ejes.axvline(x=x_line, color='grey', linewidth=1, ls='--')  # Dibujar la línea vertical

    # Configuración de la gráfica
    ejes.set_title('Gráfica de la función con líneas verticales')
    ejes.set_xlabel('x')
    ejes.set_ylabel('f(x)')
    ejes.axhline(0, color='black', linewidth=0.5, ls='--')
    ejes.axvline(0, color='black', linewidth=0.5, ls='--')
    ejes.axvline(b, color='red', linewidth=1, ls='--', label='Límite superior b')
    ejes.axvline(a, color='green', linewidth=1, ls='--', label='Límite inferior a')

    ejes.grid()
    ejes.legend()

    # Crear el lienzo para la figura y agregarlo al marco de la gráfica
    canvas = FigureCanvasTkAgg(figura, master=frame_grafica)
    canvas.draw()
    canvas.get_tk_widget().pack(side=tk.TOP, fill=tk.BOTH, expand=1)

def borrar():
    # Limpiar los cuadros de texto
    texto_resultados.delete(1.0, tk.END)
    texto_resulta2.delete(1.0, tk.END)

    # Limpiar el área de la gráfica
    for widget in frame_grafica.winfo_children():
        widget.destroy()

# Crear ventana principal
ventana = tk.Tk()
ventana.title("Integración Númerica")
ventana.geometry("600x600")

# Crear marco de entrada
frame_entrada = tk.Frame(ventana)
frame_entrada.pack(pady=20)

# Nombres y entradas
tk.Label(frame_entrada, text="Función f(x):").grid(row=0, column=0, padx=5, pady=5)
entrada_funcion = tk.Entry(frame_entrada, width=30)
entrada_funcion.grid(row=0, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Límite inferior a:").grid(row=1, column=0, padx=5, pady=5)
inferior = tk.Entry(frame_entrada, width=30)
inferior.grid(row=1, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Límite superior b:").grid(row=2, column=0, padx=5, pady=5)
superior = tk.Entry(frame_entrada, width=30)
superior.grid(row=2, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Número de rectángulos de x:").grid(row=3, column=0, padx=5, pady=5)
rectangulo = tk.Entry(frame_entrada, width=30)
rectangulo.grid(row=3, column=1, padx=5, pady=5)

# Botones
frame_botones = tk.Frame(ventana)
frame_botones.pack(pady=10)

tk.Button(frame_botones, text="Calcular", command=calcular, bg="white", fg="green").pack(side=tk.LEFT, padx=5)
tk.Button(frame_botones, text="Graficar", command=graficar, bg="white", fg="blue").pack(side=tk.LEFT, padx=5)
tk.Button(frame_botones, text="Borrar", command=borrar, bg="white", fg="red").pack(side=tk.LEFT, padx=5)

# Cuadro de resultados
texto_resultados = tk.Text(ventana, height=2, width=50)
texto_resultados.pack(pady=20)
texto_resulta2 = tk.Text(ventana, height=2, width=50)
texto_resulta2.pack(pady=20)

# Crear un marco para la gráfica
frame_grafica = tk.Frame(ventana)
frame_grafica.pack(pady=20)

ventana.mainloop()
