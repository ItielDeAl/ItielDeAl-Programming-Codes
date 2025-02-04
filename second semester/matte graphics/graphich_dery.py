import numpy as np
import matplotlib.pyplot as plt

#Derivada
x = np.arange(-2,10,0.5)
y = x**2-8*x+9

#Recta tangente.
x1 = np.arange(-2,10,0.5)
y1 = -2*x

#Imprimir
plt.plot(x,y, label='Derivada')
plt.plot(x1,y1,'r--', label='Tangente')

#Mostrar texto
plt.xlabel('eje x')
plt.ylabel('eje y')
plt.title('Ejercicio 5.3. B')

#Imprimir cuadriculas
plt.grid(True)
plt.legend()

#imprimir origen
plt.axhline(0, color='black',linewidth =1)
plt.axvline(0, color='black',linewidth =1) 

#imprimir grafica
plt.show()