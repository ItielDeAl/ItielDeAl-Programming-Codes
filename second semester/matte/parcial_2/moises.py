import sympy as sp
import numpy as np
import matplotlib.pyplot as plt

# Definir la función y su derivada
x = sp.symbols('x')
y = sp.sympify(input("Ingresa la función f(x): "))
derivada = sp.diff(y, x)

# Convertir la función de sympy a función numérica para graficar
f_lambdified = sp.lambdify(x, y, "numpy")
f_prime_lambdified = sp.lambdify(x, derivada, "numpy")

# Función para el método de Newton-Raphson
def newton_raphson(x0, tol=1e-6, maxI=100):
    print(f"\nMétodo de Newton-Raphson:")
    print(f" - Tolerancia automática: {tol}")
    print(f" - Máximo de iteraciones: {maxI}")

    # Graficar la función
    x_vals = np.linspace(x0-2, x0+2, 400)  # Generar valores para x
    y_vals = f_lambdified(x_vals)  # Evaluar la función f(x)
    
    plt.plot(x_vals, y_vals, label="f(x)", color='blue')  # Graficar la función
    plt.axhline(0, color='black',linewidth=1)  # Línea horizontal en y=0
    plt.axvline(0, color='black',linewidth=1)  # Línea vertical en x=0

    for i in range(maxI):
        fx = f_lambdified(x0)  # Evaluar la función en x0
        fxd = f_prime_lambdified(x0)  # Evaluar la derivada en x0

        if abs(fxd) < tol:  # Verifica que no se divida entre 0
            print(f"La raíz es: {x0} y es cercana a 0")
            return x0

        x1 = x0 - fx / fxd  # Calcula el siguiente valor de x
        x0 = x1  # Actualiza el valor de x0

        # Graficar la iteración de Newton-Raphson
        plt.plot(x0, f_lambdified(x0), 'ro')  # Marcar el punto en la gráfica
        print(f"Iteración {i+1}: x = {x1}")

        if abs(fx) < tol:  # Si la función en x es cercana a 0, se detiene
            print(f"La raíz encontrada es: {x1}")
            break

    plt.legend()
    plt.title("Método de Newton-Raphson")
    plt.xlabel("x")
    plt.ylabel("f(x)")
    plt.grid(True)
    plt.show()

# Definir el valor inicial y ejecutar el método
x0 = float(input("Ingresa el valor inicial: "))  # Convertir a float
newton_raphson(x0)