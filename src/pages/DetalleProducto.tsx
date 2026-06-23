import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Producto } from '../types';

export const DetalleProducto = () => {
  const { sku } = useParams<{ sku: string }>();
  const navigate = useNavigate();
  const [producto, setProducto] = useState<Producto | null>(null);

  useEffect(() => {
    const datosGuardados = localStorage.getItem('inventario_cencocal');
    if (datosGuardados) {
      const productos: Producto[] = JSON.parse(datosGuardados);
      const encontrado = productos.find(p => p.sku === sku);
      setProducto(encontrado || null);
    }
  }, [sku]);

  if (!producto) return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Producto no encontrado</h2>;

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', background: '#1e1e1e', padding: '30px', borderRadius: '8px', color: 'white' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Detalle de Producto</h2>
      <div style={{ marginTop: '20px', fontSize: '18px', lineHeight: '1.8' }}>
        <p><strong>SKU:</strong> <span style={{ color: '#007bff' }}>{producto.sku}</span></p>
        <p><strong>Nombre:</strong> {producto.nombre}</p>
        <p><strong>Marca:</strong> {producto.marca}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>
        <p><strong>Stock en Bodega:</strong> {producto.stock} unidades</p>
        <p><strong>Precio Mayorista:</strong> ${producto.precio}</p>
      </div>
      <button onClick={() => navigate('/inventario')} style={{ marginTop: '30px', padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        Volver al Inventario
      </button>
    </div>
  );
};