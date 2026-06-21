import { useState, useEffect } from 'react';

interface Despacho {
  idPedido: string;
  cliente: string;
  productos: string;
  direccion: string;
  estado: 'Pendiente' | 'En Ruta' | 'Entregado';
}

export const Despachos = () => {
  const [despachos, setDespachos] = useState<Despacho[]>(() => {
    const datosGuardados = localStorage.getItem('despachos_cencocal');
    if (datosGuardados) { return JSON.parse(datosGuardados); }
    return [
      { idPedido: 'PED-001', cliente: 'Minimarket Don Tito', productos: '10x Coca-Cola 2L, 5x Arroz 1kg', direccion: 'Av. Los Carrera 123', estado: 'Pendiente' },
      { idPedido: 'PED-002', cliente: 'Distribuidora Central', productos: '50x Cerveza Cristal Lata', direccion: 'Calle Prat 456', estado: 'En Ruta' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('despachos_cencocal', JSON.stringify(despachos));
  }, [despachos]);

  const [idPedido, setIdPedido] = useState('');
  const [cliente, setCliente] = useState('');
  const [productos, setProductos] = useState('');
  const [direccion, setDireccion] = useState('');
  const [estado, setEstado] = useState<'Pendiente' | 'En Ruta' | 'Entregado'>('Pendiente');
  const [editandoId, setEditandoId] = useState<string | null>(null);

  const guardarDespacho = (e: React.FormEvent) => {
    e.preventDefault();
    if (!idPedido.trim() || !cliente.trim() || !productos.trim() || !direccion.trim()) {
      alert('❌ Error: Todos los campos del pedido son obligatorios.'); return;
    }
    if (idPedido.trim().length < 4) { alert('❌ Error: El ID del pedido es muy corto.'); return; }
    if (cliente.trim().length < 3) { alert('❌ Error: El nombre del cliente es muy corto.'); return; }
    if (productos.trim().length < 5) { alert('❌ Error: Detalla bien los productos.'); return; }
    if (direccion.trim().length < 5) { alert('❌ Error: Ingresa una dirección exacta.'); return; }

    const nuevoDespacho: Despacho = { idPedido: idPedido.toUpperCase(), cliente, productos, direccion, estado };

    if (editandoId) {
      setDespachos(despachos.map(d => d.idPedido === editandoId ? nuevoDespacho : d));
      setEditandoId(null);
    } else {
      if (despachos.some(d => d.idPedido === nuevoDespacho.idPedido)) {
        alert('❌ Error: Ya existe un pedido registrado con este ID.'); return;
      }
      setDespachos([...despachos, nuevoDespacho]);
    }
    setIdPedido(''); setCliente(''); setProductos(''); setDireccion(''); setEstado('Pendiente');
  };

  const eliminarDespacho = (idAEliminar: string) => {
    if (window.confirm('¿Estás seguro de cancelar o eliminar este pedido?')) {
      setDespachos(despachos.filter(d => d.idPedido !== idAEliminar));
    }
  };

  const editarDespacho = (despacho: Despacho) => {
    setIdPedido(despacho.idPedido); setCliente(despacho.cliente); setProductos(despacho.productos);
    setDireccion(despacho.direccion); setEstado(despacho.estado); setEditandoId(despacho.idPedido);
  };

  const getColorEstado = (estado: string) => {
    switch (estado) {
      case 'Pendiente': return '#ffc107'; 
      case 'En Ruta': return '#17a2b8'; 
      case 'Entregado': return '#28a745'; 
      default: return 'white';
    }
  };

  const inputStyle = { padding: '8px', backgroundColor: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Panel de Control de Despachos</h2>
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginTop: '20px', color: 'white' }}>
        <h3 style={{ marginTop: 0 }}>{editandoId ? '✏️ Actualizar Estado de Pedido' : '➕ Crear Nuevo Pedido'}</h3>
        <form onSubmit={guardarDespacho} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>ID Pedido:</label>
            <input type="text" value={idPedido} onChange={(e) => setIdPedido(e.target.value)} disabled={!!editandoId} placeholder="PED-001" style={{ ...inputStyle, width: '100px', backgroundColor: editandoId ? '#555' : '#333' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Cliente Destino:</label>
            <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} style={{ ...inputStyle, width: '200px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Productos:</label>
            <input type="text" value={productos} onChange={(e) => setProductos(e.target.value)} placeholder="Ej: 5x Cloro" style={{ ...inputStyle, width: '220px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Dirección:</label>
            <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} style={{ ...inputStyle, width: '200px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Estado:</label>
            <select value={estado} onChange={(e) => setEstado(e.target.value as any)} style={{ ...inputStyle, width: '130px', cursor: 'pointer' }}>
              <option value="Pendiente">Pendiente</option>
              <option value="En Ruta">En Ruta</option>
              <option value="Entregado">Entregado</option>
            </select>
          </div>
          <button type="submit" style={{ padding: '8px 20px', background: editandoId ? '#007bff' : '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px', fontWeight: 'bold' }}>
            {editandoId ? 'Actualizar' : 'Registrar'}
          </button>
          {editandoId && (
            <button type="button" onClick={() => { setEditandoId(null); setIdPedido(''); setCliente(''); setProductos(''); setDireccion(''); setEstado('Pendiente'); }} style={{ padding: '8px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px' }}>Cancelar</button>
          )}
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff' }}>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>ID Pedido</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Cliente</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Productos Asignados</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Dirección Destino</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'center' }}>Estado</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {despachos.map((despacho) => (
            <tr key={despacho.idPedido}>
              <td style={{ padding: '10px', border: '1px solid #444', fontWeight: 'bold' }}>{despacho.idPedido}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{despacho.cliente}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{despacho.productos}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{despacho.direccion}</td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center', fontWeight: 'bold', color: getColorEstado(despacho.estado) }}>
                {despacho.estado}
              </td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center', minWidth: '150px' }}>
                <button onClick={() => editarDespacho(despacho)} style={{ background: '#ffc107', color: 'black', border: 'none', padding: '6px 10px', marginRight: '5px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Editar</button>
                <button onClick={() => eliminarDespacho(despacho.idPedido)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};