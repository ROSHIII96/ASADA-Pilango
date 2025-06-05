import { UserMinus2 } from "lucide-react"; // ícono opcional
import AveriaLista from "../Components/Averias/AveriaLista";
import AveriaBotonAgregar from "../Components/Averias/AveriaBotonAgregar";
//Para obtener la lista de averias
import { useAverias } from "../Services/AveriasService";

const ListaReportesPage = () => {
  const { data: averias, isLoading } = useAverias();

  if (isLoading) {
    return (
      <div className="pt-16">
        <p className="text-center">Cargando...</p>
      </div>
    );
  }

  const vacio = !averias || averias.length === 0;

  return (
    <div className="pt-16">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-700">Lista de averias</h1>
        <AveriaBotonAgregar />
      </header>
      {vacio ? ( //Si vacio es verdadero o falso muestra el mensaje correspondiente
        <div className="pt-16 flex flex-col items-center justify-center mt-20">
          <UserMinus2 className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-xl text-gray-500">
            No hay averias registradas aun.
          </p>
          <p className="text-sm text-gray-400">
            Puedes agregar nuevas averias en el boton agregar averias.
          </p>
        </div>
      ) : (
        <AveriaLista />
      )}
    </div>
  );
};

export default ListaReportesPage;
