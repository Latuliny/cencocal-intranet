# 🏢 Cencocal Intranet - Frontend

Plataforma Frontend desarrollada como proyecto académico para la gestión interna de inventario y directorio de clientes de Cencocal. 

Este proyecto fue construido utilizando **React** con **TypeScript** y empaquetado con **Vite** para garantizar un entorno de desarrollo rápido y tipado estricto.

## 🚀 Tecnologías Utilizadas

*   **Vite:** Herramienta de construcción rápida.
*   **React:** Librería principal para la construcción de interfaces.
*   **TypeScript:** Superconjunto de JavaScript que añade tipado estático.
*   **React Router DOM:** Para la gestión de rutas y navegación (Login, Inventario, Clientes).
*   **Context API:** Para la simulación del estado global de autenticación (sesión de usuario).

## 💻 Configuración Inicial (Vía CMD / Terminal)

Para la creación de este proyecto desde cero, se ejecutaron los siguientes comandos en la terminal de Windows (CMD):

1. **Creación del esqueleto del proyecto con Vite, React y TypeScript:**
```cmd
   npm create vite@latest cencocal-intranet -- --template react-ts

2. Instalar las dependencias
Navega hacia la carpeta del proyecto y descarga los módulos necesarios de Node:

cd cencocal-intranet
npm install

3.Levantar el servidor de desarrollo
Una vez finalizada la instalación, inicia Vite:

npm run dev

4.Visualizar la aplicación
Abre tu navegador web y visita la dirección local que te indique la terminal (generalmente es la siguiente):
http://localhost:5173/