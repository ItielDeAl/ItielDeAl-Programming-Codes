import tkinter as tk
import sympy as sp

# Define symbolic variable
x = sp.Symbol('x')

def newton_raphson(x0, y, derivada, tolerancia=1e-6, max_iter=30):
    iteraciones = 0
    error_absoluto = float('inf')
    resultados = []

    while iteraciones < max_iter and error_absoluto > tolerancia:
        try:
            x1 = x0 - (y.subs(x, x0) / derivada.subs(x, x0))
            error_absoluto = abs(x1 - x0)
            resultados.append((iteraciones, x0, x1, error_absoluto))
            x0 = x1
            iteraciones += 1
        except ZeroDivisionError:
            return None

    return resultados

def calcular():
    try:
        # Get input values
        funcion = entrada_funcion.get()
        x0 = float(entrada_aprox.get())
        tolerancia = float(entrada_error.get())
        
        # Create function and derivative
        y = sp.sympify(funcion)
        derivada = sp.diff(y, x)
        
        # Calculate results
        resultados = newton_raphson(x0, y, derivada, tolerancia)
        
        # Clear previous results
        texto_resultados.delete(1.0, tk.END)
        
        if resultados:
            # Display results in table format
            texto_resultados.insert(tk.END, "i\tRi\tRi+1\tError\n")
            texto_resultados.insert(tk.END, "-" * 50 + "\n")
            for i, r0, r1, error in resultados:
                texto_resultados.insert(tk.END, f"{i}\t{r0:.6f}\t{r1:.6f}\t{error:.6f}\n")
        else:
            texto_resultados.insert(tk.END, "Error: División por cero")
            
    except Exception as e:
        texto_resultados.delete(1.0, tk.END)
        texto_resultados.insert(tk.END, f"Error: {str(e)}")

# Create main window
ventana = tk.Tk()
ventana.title("Método de Newton-Raphson")
ventana.geometry("600x500")

# Create input frame
frame_entrada = tk.Frame(ventana)
frame_entrada.pack(pady=20)

# Input labels and entries
tk.Label(frame_entrada, text="Función f(x):").grid(row=0, column=0, padx=5, pady=5)
entrada_funcion = tk.Entry(frame_entrada, width=30)
entrada_funcion.grid(row=0, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Aproximación inicial:").grid(row=1, column=0, padx=5, pady=5)
entrada_aprox = tk.Entry(frame_entrada, width=30)
entrada_aprox.grid(row=1, column=1, padx=5, pady=5)

tk.Label(frame_entrada, text="Margen de error:").grid(row=2, column=0, padx=5, pady=5)
entrada_error = tk.Entry(frame_entrada, width=30)
entrada_error.grid(row=2, column=1, padx=5, pady=5)

# Buttons
frame_botones = tk.Frame(ventana)
frame_botones.pack(pady=10)

tk.Button(frame_botones, text="Calcular", command=calcular).pack(side=tk.LEFT, padx=5)

# Results text area
texto_resultados = tk.Text(ventana, height=15, width=50)
texto_resultados.pack(pady=20)
ventana.mainloop()
