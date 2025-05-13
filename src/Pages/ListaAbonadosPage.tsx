// src/Pages/ListaAbonadosPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { UserMinus2 } from "lucide-react"; // ícono opcional

const ListaAbonadosPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans px-4 py-6">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-white bg-blue-800 py-2 px-4 rounded-lg shadow-md hover:bg-blue-900 transition-colors duration-300"
        >
          <span className="mr-2">&larr;</span> Volver al Inicio
        </Link>
      </div>

      {/* Encabezado */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Lista de Abonados</h1>
        <p className="text-lg text-gray-600 mt-2">Aquí aparecerán los registros de abonados.</p>
      </header>

      {/* Contenido vacío */}
      <div className="flex flex-col items-center justify-center mt-20">
        <UserMinus2 className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl text-gray-500">No hay abonados registrados todavía.</p>
        <p className="text-sm text-gray-400">Puedes agregar nuevos registros cuando estén disponibles.</p>
      </div>
    </div>
  );
};

export default ListaAbonadosPage;
