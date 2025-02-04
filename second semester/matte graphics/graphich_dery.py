import numpy as np
import matplotlib.pyplot as plt

#Derivada
x = np.arange(0,10,0.5)
y = 3/x
#Recta tangente.
x1 = np.arange(0,10,0.5)
y1 = (-1/3)*x+2

#Interseccion
xi = 3
yi = 1

#Imprimir
plt.plot(x,y, label='Derivada')
plt.plot(x1,y1,'r--', label='Tangente')

#Mostrar texto
plt.xlabel('eje x')
plt.ylabel('eje y')
plt.title('Ejercicio 5.3. A')

#Imprimir cuadriculas
plt.grid(True)
plt.legend()

#imprimir grafica
plt.show()