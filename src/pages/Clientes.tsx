import { useState, useEffect } from 'react';

interface Cliente {
  rut: string;
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
}

export const Clientes = () => {
  const [clientes, setClientes] = useState<Cliente[]>(() => {
    const datosGuardados = localStorage.getItem('clientes_cencocal');
    if (datosGuardados) { return JSON.parse(datosGuardados); }
    return [
      { rut: '76.543.210-K', nombre: 'Juan Pérez', empresa: 'Minimarket El Sol', telefono: '+569 1234 5678', email: 'juan@elsol.cl' },
      { rut: '12.345.678-9', nombre: 'María González', empresa: 'Botillería Central', telefono: '+569 8765 4321', email: 'maria@botilleria.cl' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('clientes_cencocal', JSON.stringify(clientes));
  }, [clientes]);

  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const [editandoRut, setEditandoRut] = useState<string | null>(null);

  const guardarCliente = (e: React.FormEvent) => {
    e.preventDefault();

    if (!rut.trim() || !nombre.trim() || !empresa.trim() || !telefono.trim() || !email.trim()) {
      alert('❌ Error: Todos los campos son obligatorios.'); return;
    }
    if (!rut.includes('-') || rut.length < 8) {
      alert('❌ Error: Ingresa un RUT válido (Ejemplo: 11.111.111-1).'); return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      alert('❌ Error: Ingresa un correo electrónico válido.'); return;
    }
    if (telefono.trim().length < 8) {
      alert('❌ Error: El número de teléfono ingresado es demasiado corto.'); return;
    }

    const clienteFormulario: Cliente = { rut, nombre, empresa, telefono, email };

    if (editandoRut) {
      // UPDATE
      setClientes(clientes.map(c => c.rut === editandoRut ? clienteFormulario : c));
      setEditandoRut(null);
    } else {
      // CREATE
      if (clientes.some(c => c.rut === clienteFormulario.rut)) {
        alert('❌ Error: Ya existe un cliente registrado con ese RUT.'); return;
      }
      setClientes([...clientes, clienteFormulario]);
    }

    setRut(''); setNombre(''); setEmpresa(''); setTelefono(''); setEmail('');
  };

  // DELETE
  const eliminarCliente = (rutAEliminar: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este cliente del directorio?')) {
      setClientes(clientes.filter(c => c.rut !== rutAEliminar));
    }
  };

  // UPDATE
  const editarCliente = (cliente: Cliente) => {
    setRut(cliente.rut);
    setNombre(cliente.nombre);
    setEmpresa(cliente.empresa);
    setTelefono(cliente.telefono);
    setEmail(cliente.email);
    setEditandoRut(cliente.rut);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Directorio de Clientes</h2>
      
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginTop: '20px', color: 'white' }}>
        <h3 style={{ marginTop: 0 }}>{editandoRut ? '✏️ Editar Cliente' : '➕ Registrar Nuevo Cliente'}</h3>
        <form onSubmit={guardarCliente} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>RUT:</label>
            <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} disabled={!!editandoRut} placeholder="11.111.111-1" style={{ padding: '8px', width: '120px', backgroundColor: editandoRut ? '#555' : 'white' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Nombre Contacto:</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} style={{ padding: '8px', width: '200px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Empresa / Local:</label>
            <input type="text" value={empresa} onChange={(e) => setEmpresa(e.target.value)} style={{ padding: '8px', width: '200px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Teléfono:</label>
            <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} style={{ padding: '8px', width: '150px' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '8px', width: '200px' }} />
          </div>
          <button type="submit" style={{ padding: '8px 20px', background: editandoRut ? '#ffc107' : '#28a745', color: editandoRut ? 'black' : 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px', fontWeight: 'bold' }}>
            {editandoRut ? 'Actualizar' : 'Registrar'}
          </button>
          {editandoRut && (
            <button type="button" onClick={() => { setEditandoRut(null); setRut(''); setNombre(''); setEmpresa(''); setTelefono(''); setEmail(''); }} style={{ padding: '8px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px' }}>
              Cancelar
            </button>
          )}
        </form>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff' }}>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>RUT</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Nombre Contacto</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Empresa / Local</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Teléfono</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.rut}>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.rut}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.nombre}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.empresa}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.telefono}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.email}</td>
              <td style={{ padding: '10px', border: '1px solid #444', textAlign: 'center' }}>
                <button onClick={() => editarCliente(cliente)} style={{ background: '#ffc107', border: 'none', padding: '6px 10px', marginRight: '5px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Editar</button>
                <button onClick={() => eliminarCliente(cliente.rut)} style={{ background: '#dc3545', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};