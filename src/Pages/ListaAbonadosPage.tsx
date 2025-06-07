import { UserMinus2 } from "lucide-react";
import ClientesLista from "../Components/Clientes/ClientesLista";
import ClienteBotonAgregar from "../Components/Clientes/ClienteBotonAgregar";
import { useGetAbonados } from "../Hooks/useAbonados";

const ListaAbonadosPage = () => {
  const { data: users, isLoading } = useGetAbonados();
  const vacio = !users || users.length === 0;

  if (isLoading) {
    return (
      <div className="pt-16 flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-blue-700"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="ml-4 text-blue-700 font-bold">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-10 px-4 sm:px-6 lg:px-8 min-h-screen">
      {/* Encabezado con degradado */}
      <div className="max-w-3xl mx-auto mb-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-6 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-4">Lista de abonados</h2>
        <div className="flex justify-center">
          <ClienteBotonAgregar />
        </div>
      </div>

      {/* Caja azul con bordes redondeados */}
      <div className="max-w-6xl mx-auto bg-blue-100 rounded-xl p-6">
        {vacio ? (
          <div className="pt-16 flex flex-col items-center justify-center mt-20">
            <UserMinus2 className="w-16 h-16 text-gray-400 mb-4" />
            <p className="text-xl text-gray-500">
              No hay abonados registrados todavía.
            </p>
            <p className="text-sm text-gray-400">
              Puedes agregar nuevos abonados en el botón.
            </p>
          </div>
        ) : (
          <ClientesLista />
        )}
      </div>
    </div>
  );
};

export default ListaAbonadosPage;
