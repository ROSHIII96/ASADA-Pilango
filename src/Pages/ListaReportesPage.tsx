// src/Pages/ListaReportesPage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

const ListaReportesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">Reportes de Averías</h1>

      {/* Aquí eventualmente se mostrará la lista de reportes */}
      <p className="text-center text-gray-700">Aquí aparecerán los reportes registrados por los usuarios.</p>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default ListaReportesPage;
