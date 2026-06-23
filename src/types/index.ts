export interface Producto {
  sku: string;
  nombre: string;
  marca: string;
  categoria: string;
  stock: number;
  precio: number;
}

export interface Cliente {
  rutNegocio: string;
  nombreLocal: string;
  nombreEncargado: string;
  telefonoContacto: string;
  direccionDespacho: string;
}

export type EstadoDespacho = 'Pendiente' | 'En Ruta' | 'Entregado';

export interface Despacho {
  idPedido: string;
  cliente: string;
  productos: string;
  direccion: string;
  estado: EstadoDespacho;
}

export interface Usuario {
  username: string;
  rol: string;
}