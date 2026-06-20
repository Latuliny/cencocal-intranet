import { useState } from 'react';
import type { Producto } from '../types';

export const Inventario = () => {
  // 1. Estado de la lista (Aquí se guarda el inventario)
  const [productos, setProductos] = useState<Producto[]>([
    { sku: 'BEB-001', nombre: 'Coca-Cola Original 2L', marca: 'Coca-Cola', categoria: 'Bebidas', stock: 150, precio: 1800 },
    { sku: 'CER-002', nombre: 'Cerveza Cristal Lata 355cc', marca: 'Cristal', categoria: 'Cervezas', stock: 320, precio: 800 },
    { sku: 'ABA-003', nombre: 'Arroz Tucapel Grano Largo 1kg', marca: 'Tucapel', categoria: 'Abarrotes', stock: 85, precio: 1500 }
  ]);

  // 2. Estados para controlar lo que el usuario escribe en las cajas de texto del formulario
  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');

  // 3. Función que se dispara al hacer clic en "Guardar"
  const agregarProducto = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página recargue

    // Pequeña validación de seguridad
    if (!sku || !nombre || !precio) {
      alert('Por favor llena al menos el SKU, Nombre y Precio del producto');
      return;
    }

    // Armamos el nuevo producto con los datos que escribió el usuario
    const nuevoProducto: Producto = {
      sku: sku,
      nombre: nombre,
      marca: marca,
      categoria: categoria,
      stock: Number(stock), // Convertimos el texto a número matemático
      precio: Number(precio)
    };

    // ¡Aquí usamos el setProductos que antes nos daba advertencia amarilla!
    // Le decimos: "Toma todo lo que había en la lista, y agrégale el producto nuevo"
    setProductos([...productos, nuevoProducto]);

    // Limpiamos las cajas de texto para que queden en blanco
    setSku('');
    setNombre('');
    setMarca('');
    setCategoria('');
    setStock('');
    setPrecio('');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Gestión de Inventario</h2>
      
      {/* --- FORMULARIO DE INGRESO --- */}
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginTop: '20px', color: 'white' }}>
        <h3 style={{ marginTop: 0 }}>Agregar Nuevo Producto</h3>
        <form onSubmit={agregarProducto} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>SKU:</label>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} style={{ padding: '8px', width: '100px' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ padding: '8px', width: '200px' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Marca:</label>
            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} style={{ padding: '8px', width: '120px' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Categoría:</label>
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ padding: '8px', width: '120px' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Stock:</label>
            <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} style={{ padding: '8px', width: '80px' }} />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Precio:</label>
            <input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} style={{ padding: '8px', width: '100px' }} />
          </div>

          <button type="submit" style={{ padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px' }}>
            Guardar
          </button>
        </form>
      </div>

      {/* --- TABLA DE INVENTARIO --- */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff' }}>
            <th style={{ padding: '12px', border: '1px solid #444' }}>SKU</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Nombre del Producto</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Marca</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Categoría</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Stock</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Precio (CLP)</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.sku}>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center' }}>{producto.sku}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{producto.nombre}</td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center' }}>{producto.marca}</td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center' }}>{producto.categoria}</td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center', fontWeight: 'bold' }}>{producto.stock}</td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center' }}>${producto.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};