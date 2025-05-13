import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

interface Averia {
  detalle: string;
  fecha: string;
  hora: string;
  reparada: boolean;
}

const ReportesPage = () => {
  const { user } = useAuth();
  
  // Estado para manejar el formulario
  const [formulario, setFormulario] = useState({
    nombre: "",
    identificacion: "",
    correo: "",
    telefono: "",
    direccion: "",
    detalle: "",
  });

  // Estado para la lista de averías (solo lectura para usuarios normales)
  const [listaAverias, setListaAverias] = useState<Averia[]>(() => {
    const stored = localStorage.getItem("averias");
    return stored ? JSON.parse(stored) : [];
  });

  // Guardamos en localStorage cada vez que cambia la lista
  useEffect(() => {
    localStorage.setItem("averias", JSON.stringify(listaAverias));
  }, [listaAverias]);

  // Maneja cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  // Guardar una nueva avería 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { nombre, identificacion, telefono, direccion, detalle } = formulario;

    if (!nombre || !identificacion || !telefono || !direccion || !detalle) {
      alert("Por favor complete todos los campos obligatorios (*)");
      return;
    }

    const ahora = new Date();
    const nuevaAveria: Averia = {
      detalle,
      fecha: ahora.toLocaleDateString("es-CR"),
      hora: ahora.toLocaleTimeString("es-CR"),
      reparada: false,
    };

    setListaAverias(prev => [...prev, nuevaAveria]);

    // Limpiar el formulario
    setFormulario({
      nombre: "",
      identificacion: "",
      correo: "",
      telefono: "",
      direccion: "",
      detalle: "",
    });

    alert("Avería registrada correctamente");
  };

  return (
    <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Reporte de Averías</h2>

      <form onSubmit={handleSubmit} className="form" style={{ display: "grid", gap: "1rem" }}>
        {renderInput("Nombre completo *", "nombre", formulario.nombre, handleChange)}
        {renderInput("Número de identificación *", "identificacion", formulario.identificacion, handleChange)}
        {renderInput("Correo electrónico", "correo", formulario.correo, handleChange)}
        {renderInput("Número de teléfono *", "telefono", formulario.telefono, handleChange)}
        {renderInput("Dirección exacta de la avería *", "direccion", formulario.direccion, handleChange)}

        <div>
          <label>Detalle de la avería *</label>
          <textarea
            name="detalle"
            value={formulario.detalle}
            onChange={handleChange}
            rows={3}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Enviar reporte
        </button>
      </form>

      <h3 style={{ marginTop: "3rem" }}>Averías reportadas</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Detalle de la avería</th>
            <th style={thStyle}>Fecha</th>
            <th style={thStyle}>Hora</th>
            <th style={thStyle}>¿Reparada?</th>
          </tr>
        </thead>
        <tbody>
          {listaAverias.map((a, index) => (
            <tr key={index}>
              <td style={tdStyle}>{a.detalle}</td>
              <td style={tdStyle}>{a.fecha}</td>
              <td style={tdStyle}>{a.hora}</td>
              <td style={tdStyle}>{a.reparada ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Componente reutilizable para los inputs del formulario
const renderInput = (
  label: string,
  name: string,
  value: string,
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
) => (
  <div>
    <label>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={handleChange}
      required={label.includes("*")}
      style={{ width: "100%", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
    />
  </div>
);


const buttonStyle = {
  padding: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginTop: "1rem",
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#f8f9fa",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};

export default ReportesPage;