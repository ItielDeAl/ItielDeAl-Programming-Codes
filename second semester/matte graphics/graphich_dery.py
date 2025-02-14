import numpy as np
import matplotlib.pyplot as plt

#Derivada
x = np.arange(-2,10,0.5)
y = 3/x

#Recta tangente.
x1 = np.arange(-2,10,0.5)
y1 = (-1/3)*x+2

#intersecion 
xi = 3 
yi = 1

#Imprimir derivada
plt.plot(x,y, label='Derivada')

#Imprimir recta tangente
plt.plot(x1,y1,'r--', label='Tangente')

#imprimir punto
plt.plot(xi,yi,'black' , marker= 'o', label = 'intersección (3,1)')


#Mostrar texto
plt.xlabel('eje x')
plt.ylabel('eje y')
plt.title('Ejercicio 5.3. A')

#Imprimir cuadriculas
plt.grid(True)
plt.legend()

#imprimir origen
plt.axhline(0, color='black',linewidth =1)
plt.axvline(0, color='black',linewidth =1) 

#imprimir grafica
plt.show()