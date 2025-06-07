import { UserMinus2 } from "lucide-react";
import ClientesLista from "../Components/Clientes/ClientesLista";
import ClienteBotonAgregar from "../Components/Clientes/ClienteBotonAgregar";
//Para obtener la lista de abonados
import { useGetAbonados } from "../Hooks/useAbonados"; // Importa el hook useUsers para obtener la lista de abonados

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
    <div className="pt-16">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-white">Lista de Abonados</h1>
        <ClienteBotonAgregar />
      </header>
      {vacio ? ( //Si vacio es verdadero o falso muestra el mensaje correspondiente
        <div className="pt-16 flex flex-col items-center justify-center mt-20">
          <UserMinus2 className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">
            No hay abonados registrados todavía.
          </p>
          <p className="text-sm text-gray-400">
            Puedes agregar nuevos abonados en el boton agregar abonado.
          </p>
        </div>
      ) : (
        <ClientesLista />
      )}
    </div>
  );
};

export default ListaAbonadosPage;
