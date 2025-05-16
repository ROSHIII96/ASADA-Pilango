import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "@tanstack/react-router";

interface Averia {
  detalle: string;
  fecha: string;
  hora: string;
  reparada: boolean;
}

const ListaReportesPage = () => {

  //const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  // Validación solo admins pueden entrar aquí
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
   
      //navigate("/reportes"); // o cualquier otra ruta de solo visualización
    }
  }, [user, isAuthenticated/*, navigate*/]);

  const [listaAverias, setListaAverias] = useState<Averia[]>(() => {
    const stored = localStorage.getItem("averias");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("averias", JSON.stringify(listaAverias));
  }, [listaAverias]);

  const handleEliminar = (index: number) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta avería?");
    if (!confirmacion) return;

    const copia = [...listaAverias];
    copia.splice(index, 1);
    setListaAverias(copia);
  };

  const marcarComoReparada = (index: number) => {
    const copia = [...listaAverias];
    copia[index].reparada = !copia[index].reparada;
    setListaAverias(copia);
  };

  return (
  <div className="pt-16"> {/* Ajusta pt-16 según la altura de tu navbar */}
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Reportes de Averías (Admin)</h1>

      <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-3">Detalle</th>
              <th className="border p-3">Fecha</th>
              <th className="border p-3">Hora</th>
              <th className="border p-3">Estado</th>
              <th className="border p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {listaAverias.map((averia, index) => (
              <tr key={index} className={averia.reparada ? "bg-green-100" : ""}>
                <td className="border p-3">{averia.detalle}</td>
                <td className="border p-3">{averia.fecha}</td>
                <td className="border p-3">{averia.hora}</td>
                <td className="border p-3">
                  {averia.reparada ? "Reparada" : "Pendiente"}
                </td>
                <td className="border p-3 flex gap-2 justify-center">
                  <button 
                    onClick={() => marcarComoReparada(index)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    {averia.reparada ? "Marcar Pendiente" : "Marcar Reparada"}
                  </button>
                  <button 
                    onClick={() => handleEliminar(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 text-center">
        </div>
      </div>
    </div>
  </div>
  );
};

export default ListaReportesPage;
