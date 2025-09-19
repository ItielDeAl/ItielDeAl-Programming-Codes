import numpy as np #librerías por utilizar
import matplotlib.pyplot as plt
import sympy as sp

y =(input("Ingresa la función f(x): "))
def f(x):
    y=f(x)
a=input('Ingrese el limite inferior a:')
b=input('Ingrese el limite inferior b:')
m=input('Ingrese el numero de rectangulos x:')


x=np.linspace(-5,5,100)#rango de graficación

plt.plot(x,f(x),'r--',label='f(x)')#gráfica de la función f(x)
plt.xlabel('eje x')#texto para el eje x
plt.ylabel('eje y')#texto para el eje y
plt.legend(loc=1)#coloca leyenda para cada gráfica
plt.grid()#coloca cuadrícula
plt.show()