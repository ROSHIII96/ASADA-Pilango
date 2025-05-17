import { UserMinus2 } from "lucide-react"; // ícono opcional
import  AveriaLista from '../Components/Averias/AveriaLista'
import AveriaBotonAgregar from '../Components/Averias/AveriaBotonAgregar'
import { useUsers } from '../Services/AveriasService'

const ListaReportesPage = () => {
  const { data: users, isLoading } = useUsers();


  return (
  <div className="pt-16"> {/* Ajusta el espacio con el navbar */}
           {/* Muestra la lista de abonados y el boton agregar */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Lista de averias</h1>
          <AveriaBotonAgregar/>
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
      <AveriaLista />
    )
    }
  </div>
  );
};

export default ListaReportesPage;
