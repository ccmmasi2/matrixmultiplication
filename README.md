este proyecto 

1 - 
descargue el código de el siguiente enlace
https://github.com/ccmmasi2/matrixmultiplication.git

2-
Cuando lo descargue encontrará dos carpetas iniciales:
matrixmultiplicationWeb
	proyecto en angular
	Angular CLI: 16.2.9
	Node: 16.17.0
	Package Manager: npm 8.15.0
	
Matrix.Multiplication.Solution
	proyecto de visual studio 2022
	NET Core 7

3 - 
Dentro de Matrix.Multiplication.Solution ejecute el archivo Matrix.Multiplication.Solution.sln 
El proyecto fue creado sobre visual studio 2022
NET Core 7

4 - 
Ejecute la aplicación

5 - 
La aplicación creará la base de datos automaticamente con un conjunto de datos predeterminado

6 - 
La ejecutar la aplicación de visual studio se espera que tenga SqlServer Instalado y en lo posible el Management Studio

7 -
Esta predeterminado para crear la bd en localhost de SqlServer 

8 - 
Si tiene una configuración diferente de Sql por favor valide la cadena de conexión en la api en el archivo appsettings.Development.json y busque MatrixConectionDB

9 - 
Despliegue la aplicación sobre Visual Studio 2022, si todo se genera correctamente debería ver el swagger, la base de datos creada y datos insertados

10 - 
Abra el proyecto matrixmultiplicationWeb de angular abriendo ventana de comandos sobre la ruta y pulsando "code ."


11 - 
Una vez abierto abra una ventana de comandos

12 -
Instale los node_modules con "npm install"

13 -
Ejecute la aplicación con "ng serve -o"

14 - 
Los datos de prueba cargados no tienen información sobre la matriz resultante
