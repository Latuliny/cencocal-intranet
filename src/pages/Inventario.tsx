import { useState, useEffect } from 'react';
import type { Producto } from '../types';

export const Inventario = () => {
  const [productos, setProductos] = useState<Producto[]>(() => {
    const datosGuardados = localStorage.getItem('inventario_cencocal');
    if (datosGuardados) { return JSON.parse(datosGuardados); }
    return [
      { sku: 'BEB-001', nombre: 'Coca-Cola Original 2L', marca: 'Coca-Cola', categoria: 'Bebidas', stock: 150, precio: 1800 },
      { sku: 'CER-002', nombre: 'Cerveza Cristal Lata 355cc', marca: 'Cristal', categoria: 'Cervezas', stock: 320, precio: 800 },
      { sku: 'ABA-003', nombre: 'Arroz Tucapel Grano Largo 1kg', marca: 'Tucapel', categoria: 'Abarrotes', stock: 85, precio: 1500 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('inventario_cencocal', JSON.stringify(productos));
  }, [productos]);

  const [sku, setSku] = useState('');
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [categoria, setCategoria] = useState('');
  const [stock, setStock] = useState('');
  const [precio, setPrecio] = useState('');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const guardarProducto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sku.trim() || !nombre.trim() || !marca.trim() || !categoria.trim() || stock === '' || precio === '') {
      alert('❌ Error: Todos los campos son obligatorios.'); return; 
    }
    const stockNum = Number(stock);
    const precioNum = Number(precio);
    if (stockNum < 0) { alert('❌ Error: El stock no puede ser negativo.'); return; }
    if (precioNum <= 0) { alert('❌ Error: El precio debe ser mayor a 0.'); return; }
    if (sku.length < 4) { alert('❌ Error: El SKU ingresado es muy corto.'); return; }

    const productoFormulario: Producto = { sku: sku.toUpperCase(), nombre, marca, categoria, stock: stockNum, precio: precioNum };

    if (editandoId) {
      setProductos(productos.map(p => p.sku === editandoId ? productoFormulario : p));
      setEditandoId(null);
    } else {
      if (productos.some(p => p.sku === productoFormulario.sku)) {
        alert('❌ Error: Ya existe un producto con este SKU.'); return;
      }
      setProductos([...productos, productoFormulario]);
    }
    setSku(''); setNombre(''); setMarca(''); setCategoria(''); setStock(''); setPrecio('');
  };

  const eliminarProducto = (skuAEliminar: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      setProductos(productos.filter(p => p.sku !== skuAEliminar));
    }
  };

  const editarProducto = (producto: Producto) => {
    setSku(producto.sku); setNombre(producto.nombre); setMarca(producto.marca);
    setCategoria(producto.categoria); setStock(producto.stock.toString()); setPrecio(producto.precio.toString());
    setEditandoId(producto.sku);
  };

  // Estilo unificado para los inputs
  const inputStyle = { padding: '8px', backgroundColor: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Gestión de Inventario</h2>
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginTop: '20px', color: 'white' }}>
        <h3 style={{ marginTop: 0 }}>{editandoId ? '✏️ Editar Producto' : '➕ Agregar Nuevo Producto'}</h3>
        <form onSubmit={guardarProducto} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>SKU:</label>
            <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} disabled={!!editandoId} style={{ ...inputStyle, width: '100px', backgroundColor: editandoId ? '#555' : '#333' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Nombre:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ ...inputStyle, width: '200px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Marca:</label>
            <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} style={{ ...inputStyle, width: '120px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Categoría:</label>
            <input type="text" value={categoria} onChange={(e) => setCategoria(e.target.value)} style={{ ...inputStyle, width: '120px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Stock:</label>
            <input 
              type="number" 
              min="0"
              value={stock} 
              onChange={(e) => {
                const valor = e.target.value;
                if (valor === '' || Number(valor) >= 0) {
                  setStock(valor);
                }
              }} 
              style={{ ...inputStyle, width: '80px' }} 
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Precio:</label>
            <input 
              type="number" 
              min="0"
              value={precio} 
              onChange={(e) => {
                const valor = e.target.value;
                if (valor === '' || Number(valor) >= 0) {
                  setPrecio(valor);
                }
              }} 
              style={{ ...inputStyle, width: '100px' }} 
            />
          </div>
          <button type="submit" style={{ padding: '8px 20px', background: editandoId ? '#ffc107' : '#28a745', color: editandoId ? 'black' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px', fontWeight: 'bold' }}>
            {editandoId ? 'Actualizar' : 'Guardar'}
          </button>
          {editandoId && (
            <button type="button" onClick={() => { setEditandoId(null); setSku(''); setNombre(''); setMarca(''); setCategoria(''); setStock(''); setPrecio(''); }} style={{ padding: '8px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px' }}>Cancelar</button>
          )}
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff' }}>
            <th style={{ padding: '12px', border: '1px solid #444' }}>SKU</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Nombre</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Marca</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Categoría</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Stock</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Precio</th>
            <th style={{ padding: '12px', border: '1px solid #444' }}>Acciones</th>
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
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center' }}>
                <button onClick={() => editarProducto(producto)} style={{ background: '#ffc107', color: 'black', border: 'none', padding: '6px 10px', marginRight: '5px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Editar</button>
                <button onClick={() => eliminarProducto(producto.sku)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};