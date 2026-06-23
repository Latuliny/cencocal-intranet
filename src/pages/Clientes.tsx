import { useState, useEffect } from 'react';

interface Cliente {
  rutNegocio: string;
  nombreLocal: string;
  nombreEncargado: string;
  telefonoContacto: string;
  direccionDespacho: string;
}

export const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const datosGuardados = localStorage.getItem('clientes_cencocal');
    if (datosGuardados) { return JSON.parse(datosGuardados); }
    return [
      { rutNegocio: '76.543.210-K', nombreLocal: 'Minimarket Don Tito', nombreEncargado: 'Tito Ramírez', telefonoContacto: '+569 1234 5678', direccionDespacho: 'Av. Los Carrera 123' },
      { rutNegocio: '12.345.678-9', nombreLocal: 'Distribuidora Central', nombreEncargado: 'María González', telefonoContacto: '+569 8765 4321', direccionDespacho: 'Calle Prat 456, Local 2' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('clientes_cencocal', JSON.stringify(clientes));
  }, [clientes]);

  const [rutNegocio, setRutNegocio] = useState('');
  const [nombreLocal, setNombreLocal] = useState('');
  const [nombreEncargado, setNombreEncargado] = useState('');
  const [telefonoContacto, setTelefonoContacto] = useState('');
  const [direccionDespacho, setDireccionDespacho] = useState('');
  const [editandoRut, setEditandoRut] = useState<string | null>(null);

  const guardarCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rutNegocio.trim() || !nombreLocal.trim() || !nombreEncargado.trim() || !telefonoContacto.trim() || !direccionDespacho.trim()) {
      alert('❌ Error: Los 5 campos son obligatorios para el registro.'); return;
    }
    if (!rutNegocio.includes('-') || rutNegocio.length < 8) {
      alert('❌ Error: Ingresa un RUT válido con guion (Ejemplo: 11.111.111-1).'); return;
    }
    if (telefonoContacto.trim().length < 8) {
      alert('❌ Error: El número de teléfono ingresado es demasiado corto.'); return;
    }

    const clienteFormulario: Cliente = { rutNegocio, nombreLocal, nombreEncargado, telefonoContacto, direccionDespacho };

    if (editandoRut) {
      setClientes(clientes.map(c => c.rutNegocio === editandoRut ? clienteFormulario : c));
      setEditandoRut(null);
    } else {
      if (clientes.some(c => c.rutNegocio === clienteFormulario.rutNegocio)) {
        alert('❌ Error: Ya existe un negocio registrado con ese RUT.'); return;
      }
      setClientes([...clientes, clienteFormulario]);
    }
    setRutNegocio(''); setNombreLocal(''); setNombreEncargado(''); setTelefonoContacto(''); setDireccionDespacho('');
  };

  const eliminarCliente = (rutAEliminar: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este negocio del directorio?')) {
      setClientes(clientes.filter(c => c.rutNegocio !== rutAEliminar));
    }
  };

  const editarCliente = (cliente: Cliente) => {
    setRutNegocio(cliente.rutNegocio); setNombreLocal(cliente.nombreLocal); setNombreEncargado(cliente.nombreEncargado);
    setTelefonoContacto(cliente.telefonoContacto); setDireccionDespacho(cliente.direccionDespacho);
    setEditandoRut(cliente.rutNegocio);
  };

  const inputStyle = { padding: '8px', backgroundColor: '#333', color: 'white', border: '1px solid #555', borderRadius: '4px' };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #28a745', paddingBottom: '10px' }}>Directorio de Comercios Asociados</h2>
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginTop: '20px', color: 'white' }}>
        <h3 style={{ marginTop: 0 }}>{editandoRut ? '✏️ Editar Negocio' : '➕ Registrar Nuevo Negocio'}</h3>
        <form onSubmit={guardarCliente} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>RUT del Negocio:</label>
            <input type="text" value={rutNegocio} onChange={(e) => setRutNegocio(e.target.value)} disabled={!!editandoRut} placeholder="11.111.111-1" style={{ ...inputStyle, width: '120px', backgroundColor: editandoRut ? '#555' : '#333' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Nombre del Local:</label>
            <input type="text" value={nombreLocal} onChange={(e) => setNombreLocal(e.target.value)} placeholder="Ej. Minimarket Don Tito" style={{ ...inputStyle, width: '200px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Dueño o Encargado:</label>
            <input type="text" value={nombreEncargado} onChange={(e) => setNombreEncargado(e.target.value)} style={{ ...inputStyle, width: '180px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Teléfono o Celular:</label>
            <input type="text" value={telefonoContacto} onChange={(e) => setTelefonoContacto(e.target.value)} style={{ ...inputStyle, width: '140px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Dirección Exacta:</label>
            <input type="text" value={direccionDespacho} onChange={(e) => setDireccionDespacho(e.target.value)} style={{ ...inputStyle, width: '220px' }} />
          </div>
          <button type="submit" style={{ padding: '8px 20px', background: editandoRut ? '#ffc107' : '#28a745', color: editandoRut ? 'black' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px', fontWeight: 'bold' }}>
            {editandoRut ? 'Actualizar' : 'Registrar'}
          </button>
          {editandoRut && (
            <button type="button" onClick={() => { setEditandoRut(null); setRutNegocio(''); setNombreLocal(''); setNombreEncargado(''); setTelefonoContacto(''); setDireccionDespacho(''); }} style={{ padding: '8px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px' }}>Cancelar</button>
          )}
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#0077ff' }}>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>RUT</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Nombre Local</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Dueño/Encargado</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Contacto</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Dirección de Despacho</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.rutNegocio}>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.rutNegocio}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.nombreLocal}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.nombreEncargado}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.telefonoContacto}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.direccionDespacho}</td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center', minWidth: '150px' }}>
                <button onClick={() => editarCliente(cliente)} style={{ background: '#ffc107', color: 'black', border: 'none', padding: '6px 10px', marginRight: '5px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.rutNegocio)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};