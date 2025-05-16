import { UserMinus2 } from "lucide-react"; // ícono opcional
import  ClientesLista from '../Components/Clientes/ClientesLista'
import ClienteBotonAgregar from '../Components/Clientes/ClienteBotonAgregar'
import { useUsers } from '../Services/UsersService'

const ListaAbonadosPage = () => {
  const { data: users, isLoading } = useUsers();


  return (
  <div className="pt-16"> {/* Ajusta el espacio con el navbar */}
           {/* Muestra la lista de abonados y el boton agregar */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Lista de Abonados</h1>
          <ClienteBotonAgregar/>
      </header>
    {isLoading ? 
    (
      <p className="text-center">Cargando...</p>
    ) : users && users.length === 0 ? 
    (
      <div className="flex flex-col items-center justify-center mt-20">
        <UserMinus2 className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl text-gray-500">No hay abonados registrados todavía.</p>
        <p className="text-sm text-gray-400">Puedes agregar nuevos abonados en el boton agregar abonado.</p>
      </div>
    ) 
    : 
    (
      <ClientesLista />
    )
    }
  </div>
  );
};

export default ListaAbonadosPage;

/*
//import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

  const queryClient = new QueryClient()

        <QueryClientProvider client={queryClient}>
        </QueryClientProvider>
          <ClientesLista />

*/