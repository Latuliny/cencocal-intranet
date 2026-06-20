// types/index.ts

// Interfaz para el usuario que inicia sesión
export interface Usuario {
    username: string;
    rol: string;
}

// Interfaz para el Módulo 1: Inventario
export interface Producto {
    sku: string;
    nombre: string;
    marca: string;
    categoria: string;
    stock: number;
    precio: number;
}

// Interfaz para el Módulo 2: Clientes
export interface Cliente {
    rut: string;
    nombreLocal: string;
    encargado: string;
    telefono: string;
    direccion: string;
}