import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import axios from 'axios'

// JSONBin de los abonados
const BIN = '6828f6638960c979a59b9c93';
const USERS_API_URL = `https://api.jsonbin.io/v3/b/${BIN}`;
const API_KEY = '$2a$10$wUJhtUn1l0GFbHj0iXwYsek/JCBnzx0S4f.9kb.bA0fnc0XDYRKzS';

/*
/////////////////////Filtra entre cliente o averia//////////////////////
export function getClientes(data) {
  return data.filter(item => item.numMedidor !== undefined);
}

export function getAverias(data) {
  return data.filter(item => item.numAveria !== undefined);
}*/

//////////////////////Leer Usuarios//////////////////////

const fetchUsers = async () => {  //Obtiene users desde JSONBin
  try 
  {
    const response = await axios.get(USERS_API_URL,
      {
        headers: {
          'X-Access-Key': API_KEY,
        }
      });
    return response.data.record.users || [];
  }
  catch (error) {  //Sucede en caso de algun error y retorna esto en consola
    console.error("Error fetching users:", error);
    return [];
  }
};

export const useUsers = () => {  //Corre la función fetchUsers
    return useQuery({
      queryKey: ['users'],
      queryFn: fetchUsers,
      staleTime: 0,   // guarda en cache por 5 minutos
      retry: 1,                    // intenta solo 1 vez si falla
    });
  };

//////////////////////Agregar Usuarios//////////////////////

export async function postUser({ newUser }) {
  //const users = await fetchUsers();

   // 1. Lee el objeto completo del bin
  const response = await axios.get(USERS_API_URL, {
    headers: { 'X-Access-Key': API_KEY }
  });
  const record = response.data.record || {};

  // 2. Trabaja solamente sobre la propiedad
  const users = record.users || [];

   // Valida que newUser exista o tenga un ID, si no lanza un error y una alerta
  if (!newUser || !newUser.cedula) {
    alert("Formulario incompleto o no cuenta con un ID.");  
    throw new Error("El objeto newUser es inválido o no tiene un ID.");   //Muestra el error y detiene la ejecución de la función
  }

// Verificar si el ID ya existe en el servidor
const userExistsInServer = users.some((user) => user.cedula === newUser.cedula);
if (userExistsInServer) {
  alert(`El usuario con cedula ${newUser.cedula} ya existe en el servidor.`);
  throw new Error(`El usuario con cedula ${newUser.id} ya existe en el servidor.`);
}

users.push(newUser);

  try {
      const response = await axios.put(
        USERS_API_URL,
          { ...record, users: users }, // Envía la lista actualizada a la API
          {
            headers: {
              'X-Access-Key': API_KEY,
            }
          }
      );  

      if(response.status != 200) 
          throw new Error("Error adding user");
        alert(`El usuario con ID ${newUser.cedula} ha sido agregado.`);
      return newUser;
  } catch (error) {
      console.error("Error adding user:", error);
  }
}

  // Hook para encapsular la mutation + cache updates
  export function useAddUser() {
    const queryClient = useQueryClient()
    
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

//////////////////////Actualizar usuario//////////////////////

export async function updateUser({ updatedUser }) {
  //const users = await fetchUsers(); // Obtiene la lista actual de usuarios desde JSONBin

  // 1. Lee el objeto completo del bin
  const response = await axios.get(USERS_API_URL, {
    headers: { 'X-Access-Key': API_KEY }
  });
  const record = response.data.record || {};

  // 2. Trabaja solamente sobre la propiedad
  const users = record.users || [];
  
  // Verifica si el usuario con el ID proporcionado existe
  const userExists = users.some((user) => user.cedula === updatedUser.cedula);
  if (!userExists) {
    alert(`El usuario con ID ${updatedUser.cedula} no se encuentra en el servidor.`);
    throw new Error(`Usuario con ID ${updatedUser.cedula} no encontrado`);
  }

  // Actualiza el usuario con el mismo ID
  const updatedUsers = users.map((user) =>
    user.cedula === updatedUser.cedula ? updatedUser : user
  );

  try {
    const response = await axios.put(
      USERS_API_URL,
      { ...record, users: updatedUsers }, // Envía la lista actualizada a la API
      {
        headers: {
          'X-Access-Key': API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error updating user");
    }
    alert(`El usuario con ID ${updatedUser.cedula} ha sido actualizado.`);
    return updatedUser; // Devuelve el usuario actualizado
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
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

      // Actualización optimista: esto significa que se actualiza el usuario en la caché antes de que la solicitud se complete
      queryClient.setQueryData(['users'], (old) =>
        old
          ? old.map((user) =>
              user.cedula === updatedUser.cedula ? updatedUser : user
            )
          : []
      );

      return { previous }; // En caso de error, se revertirán los cambios
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['users'], context.previous); // Revertir cambios si ocurre un error
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(['users']);
    },
  });
}

//////////////////////Eliminar usuario//////////////////////

export async function deleteUser({ userId }) {
  // 1. Lee el objeto completo del bin
  const response = await axios.get(USERS_API_URL, {
    headers: { 'X-Access-Key': API_KEY }
  });
  const record = response.data.record || {};

  // 2. Trabaja solamente sobre la propiedad
  const users = record.users || [];

  // Filtra al usuario que se desea eliminar
const updatedUsers = users.filter(
    (user) => String(user.numMedidor) !== String(userId)
  );
  
  try {
    const response = await axios.put(
      USERS_API_URL,
      { ...record, users: updatedUsers }, // Actualiza la lista sin el usuario eliminado
      {
        headers: {
          'X-Access-Key': API_KEY,
        },
      }
      
    );

    if (response.status !== 200) {
      throw new Error("Error deleting user");
    }
    alert(`El usuario con numero de medidor ${userId} ha sido eliminado.`)
    return userId; // Devuelve el ID del usuario eliminado
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error; 
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
