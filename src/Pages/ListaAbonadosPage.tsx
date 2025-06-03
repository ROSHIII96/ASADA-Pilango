import { UserMinus2 } from "lucide-react"; // ícono opcional
import  ClientesLista from '../Components/Clientes/ClientesLista'
import ClienteBotonAgregar from '../Components/Clientes/ClienteBotonAgregar'
//Para obtener la lista de abonados
import { useUsers } from '../Services/UsersService'

const ListaAbonadosPage = () => {
  // Hook useUsers para obtener la lista de abonados, se obtiene en data y se renombra a users
  const { data: users, isLoading } = useUsers(); 

   //Cuando isLoading es verdadero, muestra un mensaje de carga
   //hasta que se obtenga la lista de abonados
  if (isLoading) { 
    return (
      <div className="pt-16">
        <p className="text-center">Cargando...</p>
      </div>
    );
  }

const vacio = !users || users.length === 0;

return (
  <div className="pt-16">
    <header className="text-center mb-10">
      <h1 className="text-4xl font-bold text-blue-700">Lista de Abonados</h1>
      <ClienteBotonAgregar/>
    </header>
    {vacio ?  //Si vacio es verdadero o falso muestra el mensaje correspondiente
    (
     <div className="pt-16 flex flex-col items-center justify-center mt-20">
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
}

export default ListaAbonadosPage;