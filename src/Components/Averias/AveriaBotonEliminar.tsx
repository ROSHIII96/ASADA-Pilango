//import GenericModal from "./GenericModal";
//import ClienteFormularioEliminar from "././ClienteFormularioEliminar";
//import { useState } from "react";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../Services/AveriasService';

const AveriaBotonEliminar = ({ row }) =>
{
  const queryClient = useQueryClient();

  // Configura la mutación para eliminar el usuario
  const mutation = useMutation({
    mutationFn: deleteUser, // Asegurarse de usar mutationFn en lugar de pasar directamente la función
    onSuccess: () => {
      // Invalida la caché para recargar los datos actualizados
      queryClient.invalidateQueries(['users']);
    },
  });

const handleDelete = () => {
  const numAveria = row.original.numAveria; // Obtiene el ID de la avería desde la fila
  if (window.confirm(`¿Estás seguro de que deseas eliminar la avería número: ${numAveria}?`)) {
    mutation.mutate({ numAveria }); // Llama a la mutación para eliminar la avería
  }
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
    )
}

export default AveriaBotonEliminar;