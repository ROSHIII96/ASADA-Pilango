// src/Pages/ListaAbonadosPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { UserMinus2 } from "lucide-react"; // ícono opcional
import  ClientesLista from '../Components/Clientes/ClientesLista'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ClienteBotonAgregar from '../Components/Clientes/ClienteBotonAgregar'


const ListaAbonadosPage = () => {
      const queryClient = new QueryClient()

      
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
              <QueryClientProvider client={queryClient}>
                <ClienteBotonAgregar/>
                <ClientesLista />
                </QueryClientProvider>

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
