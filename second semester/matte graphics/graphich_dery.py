import numpy as np
import matplotlib.pyplot as plt

x = np.arange(0,10,0.5)
y = (x*x)-(8*x)+9

x1 = np.arange(0,10,0.5)
y1 = -2*x

#Interseccion
xi = 3
yi = 1


plt.plot(x1,y1)
plt.plot(x,y)

plt.xlabel('Lado x')
plt.ylabel('Lado y')
plt.title('Ejercicio 5.3. B')
plt.show()