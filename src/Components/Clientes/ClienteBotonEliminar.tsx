import { useDeleteAbonado } from "../../Hooks/useAbonados";

const ClienteBotonEliminar = ({ row }) => {
  const mutation = useDeleteAbonado();

  const handleDelete = () => {
    const numMedidor = row.original.numMedidor;
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar al usuario con numero de medidor -->> ${numMedidor}  ?`
      )
    ) {
      mutation.mutate(numMedidor); // Llama a la mutación para eliminar el usuario
    }
    console.log("Eliminando usuario con numero de medidor:", numMedidor);
  };

  return (
    <div className="flex justify-end mb-4">
      <button
        onClick={handleDelete}
        className="px-5 py-2.5 text-sm font-medium text-white 
                  bg-red-600 rounded-lg hover:bg-blue-700 
                  focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Eliminar
      </button>
    </div>
  );
};

export default ClienteBotonEliminar;
