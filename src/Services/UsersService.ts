import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const BIN = '6820eeeb8a456b79669bc349';
const USERS_API_URL = 'https://api.jsonbin.io/v3/b/' + BIN;
const API_KEY = '$2a$10$wUJhtUn1l0GFbHj0iXwYsek/JCBnzx0S4f.9kb.bA0fnc0XDYRKzS';

const fetchUsers = async () => {  //Obtiene users desde la JSONBin
  try 
  {
    const response = await axios.get(USERS_API_URL,
      {
        headers: {
          'X-Access-Key': API_KEY,
        }
      });
    return response.data.record.users;  // assumes response.data has the shape { id, record, metadata }
  }
  catch (error) {
    console.error("Error fetching users:", error);
    return []; // Return an empty array on error
  }
};

export const useUsers = () => {  //Corre la función fetchUsers
    return useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      staleTime: 5 * 60 * 1000,   // guarda en cache por 5 minutos
      retry: 1,                    // intenta solo 1 vez si falla
    });
  };

 /**
 * Custom hook to retrieve users via React Query.
 * Returns { data, isLoading, isError, error } where data is an array of us-ers.
 * Uses the object syntax required by React Query.
 */

export async function postUser({ newUser }) {
  const users = await fetchUsers();
  //const updated = [...existing, newUser];              
  users.push(newUser);

  try {
      const response = await axios.put(
        USERS_API_URL,
          { users: users },
          {
            headers: {
              'X-Access-Key': API_KEY,
            }
          }
      );

      if(response.status != 200) 
          throw new Error("Error adding user");

      return newUser;
  } catch (error) {
      console.error("Error adding user:", error);
  }
}

 

  // Hook to encapsulate the mutation + cache updates
  export function useAddUser() {
    const queryClient = useQueryClient()
    
    // **Optimistic update**: before the request fires
    return useMutation({
      mutationFn: postUser,
      onMutate: async ({ newUser }) => {
        await queryClient.cancelQueries(['users'])
        const previous = queryClient.getQueryData(['users'])
        queryClient.setQueryData(['users'], old => [...(old||[]), newUser])
        return { previous }
      },
      onError: (err, variables, context) => {
        if (context?.previous) {
          queryClient.setQueryData(['users'], context.previous)
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(['users'])
      }
    })
}







//////////////////////Eliminar usuario//////////////////////

export async function deleteUser({ userId }) {
  const users = await fetchUsers(); // Obtiene la lista actual de usuarios
  const updatedUsers = users.filter((user) => user.id !== userId); // Filtra al usuario que se desea eliminar

  try {
    const response = await axios.put(
      USERS_API_URL,
      { users: updatedUsers }, // Actualiza la lista sin el usuario eliminado
      {
        headers: {
          'X-Access-Key': API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error deleting user");
    }

    return userId; // Devuelve el ID del usuario eliminado
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; // Lanza el error para que pueda ser manejado por react-query
  }
}

// Hook para manejar la eliminación de usuarios
export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser, // Función que realiza la eliminación
    onMutate: async ({ userId }) => {
      await queryClient.cancelQueries(['users']); // Cancela cualquier consulta en curso
      const previous = queryClient.getQueryData(['users']); // Obtiene los datos actuales en caché

      // Actualización optimista: elimina el usuario de la caché antes de que la solicitud se complete
      queryClient.setQueryData(['users'], (old) =>
        old ? old.filter((user) => user.id !== userId) : []
      );

      return { previous }; // Devuelve los datos anteriores para revertir en caso de error
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['users'], context.previous); // Revertir cambios si ocurre un error
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']); // Invalida la consulta para recargar los datos actualizados
    },
  });
}


//////////////////////Actualizar usuario//////////////////////

export async function updateUser({ updatedUser }) {
  const users = await fetchUsers(); // Obtiene la lista actual de usuarios
  const updatedUsers = users.map((user) =>
    user.id === updatedUser.id ? updatedUser : user // Reemplaza el usuario con el mismo ID
  );

  try {
    const response = await axios.put(
      USERS_API_URL,
      { users: updatedUsers }, // Envía la lista actualizada a la API
      {
        headers: {
          'X-Access-Key': API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error updating user");
    }

    return updatedUser; // Devuelve el usuario actualizado
  } catch (error) {
    console.error("Error updating user:", error);
    throw error; // Lanza el error para que pueda ser manejado por react-query
  }
}

// Hook para manejar la actualización de usuarios
export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUser, // Función que realiza la actualización
    onMutate: async ({ updatedUser }) => {
      await queryClient.cancelQueries(['users']); // Cancela cualquier consulta en curso
      const previous = queryClient.getQueryData(['users']); // Obtiene los datos actuales en caché

      // Actualización optimista: actualiza el usuario en la caché antes de que la solicitud se complete
      queryClient.setQueryData(['users'], (old) =>
        old
          ? old.map((user) =>
              user.id === updatedUser.id ? updatedUser : user
            )
          : []
      );

      return { previous }; // Devuelve los datos anteriores para revertir en caso de error
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['users'], context.previous); // Revertir cambios si ocurre un error
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']); // Invalida la consulta para recargar los datos actualizados
    },
  });
}