// src/Pages/EditarAbonadoPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ClienteBotonActualizar from "../Components/Clientes/ClienteBotonActualizar";

const EditarAbonadoPage = () => {
      const queryClient = new QueryClient()
  
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans px-4 py-6">
      {/* Botón Volver */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-white bg-blue-800 py-2 px-4 rounded-lg shadow-md hover:bg-blue-900 transition-colors duration-300"
        >
          <span className="mr-2">&larr;</span> Volver al inicio
        </Link>
      </div>

      {/* Encabezado */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Editar Abonado</h1>
        <p className="text-lg text-gray-600 mt-2">Aquí podrás modificar los datos de un abonado.</p>
       <QueryClientProvider client={queryClient}>
          <ClienteBotonActualizar/>                
        </QueryClientProvider>
      </header>

      {/* Contenido vacío por ahora */}
      <div className="text-center text-gray-500">
        <p>Próximamente se podrá editar la información del abonado.</p>
      </div>
    </div>
  );
};

export default EditarAbonadoPage;
