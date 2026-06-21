import { useState } from 'react';

// Estructura de datos para un Cliente
interface Cliente {
  rut: string;
  nombre: string;
  empresa: string;
  telefono: string;
  email: string;
}

export const Clientes = () => {
  // Lista inicial con datos de prueba
  const [clientes, setClientes] = useState<Cliente[]>([
    { rut: '76.543.210-K', nombre: 'Juan Pérez', empresa: 'Minimarket El Sol', telefono: '+569 1234 5678', email: 'juan@elsol.cl' },
    { rut: '12.345.678-9', nombre: 'María González', empresa: 'Botillería Central', telefono: '+569 8765 4321', email: 'maria@botilleria.cl' }
  ]);

  // Estados para capturar el texto de los campos
  const [rut, setRut] = useState('');
  const [nombre, setNombre] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');

  const agregarCliente = (e: React.FormEvent) => {
    e.preventDefault();

    // --- VALIDACIONES DE SEGURIDAD ---

    // 1. Evitar campos totalmente vacíos o con puros espacios
    if (!rut.trim() || !nombre.trim() || !empresa.trim() || !telefono.trim() || !email.trim()) {
      alert('❌ Error: Todos los campos son obligatorios para registrar un cliente.');
      return;
    }

    // 2. Validar que el RUT contenga al menos un guion y un largo mínimo coherente
    if (!rut.includes('-') || rut.length < 8) {
      alert('❌ Error: Ingresa un RUT válido que contenga guion (Ejemplo: 11.111.111-1).');
      return;
    }

    // 3. Validar estructura del correo electrónico (debe incluir un @ y un punto)
    if (!email.includes('@') || !email.includes('.')) {
      alert('❌ Error: Ingresa un correo electrónico válido (Ejemplo: contacto@empresa.cl).');
      return;
    }

    // 4. Validar el largo del teléfono para evitar números incompletos
    if (telefono.trim().length < 8) {
      alert('❌ Error: El número de teléfono ingresado es demasiado corto.');
      return;
    }

    // --- FIN DE LAS VALIDACIONES ---

    const nuevoCliente: Cliente = {
      rut: rut,
      nombre: nombre,
      empresa: empresa,
      telefono: telefono,
      email: email
    };

    // Agregar el nuevo registro a la tabla
    setClientes([...clientes, nuevoCliente]);

    // Limpiar las cajas de texto del formulario
    setRut('');
    setNombre('');
    setEmpresa('');
    setTelefono('');
    setEmail('');
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px' }}>Directorio de Clientes</h2>
      
      {/* Formulario de registro */}
      <div style={{ background: '#1e1e1e', padding: '20px', borderRadius: '8px', marginTop: '20px', color: 'white' }}>
        <h3 style={{ marginTop: 0 }}>Registrar Nuevo Cliente</h3>
        <form onSubmit={agregarCliente} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '14px', marginBottom: '4px' }}>RUT:</label>
            <input type="text" value={rut} onChange={(e) => setRut(e.target.value)} style={{ padding: '8px', width: '120px' }} placeholder="11.111.111-1" />
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

          <button type="submit" style={{ padding: '8px 20px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', height: '35px' }}>
            Registrar
          </button>
        </form>
      </div>

      {/* Tabla donde se muestran los datos en pantalla */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '30px', backgroundColor: '#1e1e1e', color: '#fff' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff' }}>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>RUT</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Nombre Contacto</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Empresa / Local</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Teléfono</th>
            <th style={{ padding: '12px', border: '1px solid #444', textAlign: 'left' }}>Email</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.rut}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.nombre}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.empresa}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.telefono}</td>
              <td style={{ padding: '10px', border: '1px solid #444' }}>{cliente.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};