import GenericModal from "./GenericModal";
import ClienteFormularioEliminar from "././ClienteFormularioEliminar";
import { useState } from "react";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../Services/UsersService';

const ClienteBotonEliminar = ({ row }) =>
{
      const queryClient = useQueryClient();

  // Configura la mutación para eliminar el usuario
  const mutation = useMutation({
    mutationFn: deleteUser, // Asegúrate de usar `mutationFn` en lugar de pasar directamente la función
    onSuccess: () => {
      // Invalida la caché para recargar los datos actualizados
      queryClient.invalidateQueries(['users']);
    },
  });

  const handleDelete = () => {
    const userId = row.original.id; // Obtiene el ID del cliente desde la fila
    if (window.confirm(`¿Estás seguro de que deseas eliminar al usuario con ID ${userId}?`)) {
      mutation.mutate({ userId }); // Llama a la mutación para eliminar el usuario
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

export default ClienteBotonEliminar;