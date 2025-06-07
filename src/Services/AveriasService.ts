/*import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";

// JSONBin de los abonados
const BIN = "6828f6638960c979a59b9c93";
const USERS_API_URL = `https://api.jsonbin.io/v3/b/${BIN}`;
const API_KEY = "$2a$10$wUJhtUn1l0GFbHj0iXwYsek/JCBnzx0S4f.9kb.bA0fnc0XDYRKzS";

//////////////////////Leer Usuarios//////////////////////

const fetchAverias = async () => {
  //Obtiene users desde JSONBin
  try {
    const response = await axios.get(USERS_API_URL, {
      headers: {
        "X-Access-Key": API_KEY,
      },
    });
    console.log("Respuesta completa de JSONBin:", response.data);

    return response.data.record.averias || [];
  } catch (error) {
    //Sucede en caso de algun error y retorna esto en consola
    console.error("Error fetching averias:", error);
    return [];
  }
};

export const useAverias = () => {
  //Corre la función fetchUsers
  return useQuery({
    queryKey: ["averias"],
    queryFn: fetchAverias,
    staleTime: 300000, // guarda en cache por 5 minutos
    retry: 1, // intenta solo 1 vez si falla
  });
};

//////////////////////Agregar Averia//////////////////////

export async function postUser({ newUser }) {
  // 1. Lee el objeto completo del bin
  const response = await axios.get(USERS_API_URL, {
    headers: { "X-Access-Key": API_KEY },
  });
  const record = response.data.record || {};

  // 2. Trabaja sobre la propiedad averias
  const averias = record.averias || [];

  // Valida que newUser exista o tenga un ID, si no lanza un error y una alerta
  if (!newUser || !newUser.numAveria) {
    alert("Formulario incompleto o no cuenta con un ID.");
    throw new Error("El objeto newUser es inválido o no tiene un ID."); //Muestra el error y detiene la ejecución de la función
  }

  // Verificar si el ID ya existe en el servidor
  const AveriaExistsInServer = averias.some(
    (user) => user.numAveria === newUser.numAveria
  );
  if (AveriaExistsInServer) {
    alert(`La averia numero ${newUser.numAveria} ya existe en el servidor.`);
    throw new Error(
      `La averia numero ${newUser.numAveria} ya existe en el servidor.`
    );
  }

  averias.push(newUser);

  try {
    const response = await axios.put(
      USERS_API_URL,
      { ...record, averias: averias }, // Envía la lista actualizada a la API
      {
        headers: {
          "X-Access-Key": API_KEY,
        },
      }
    );

    if (response.status != 200) throw new Error("Error adding user");
    alert(`Se agrego una nueva averia con el numero ${newUser.numAveria}.`);
    return newUser;
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

// Hook para encapsular la mutation + cache updates
export function useAddUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postUser,
    onMutate: async ({ newUser }) => {
      await queryClient.cancelQueries(["averias"]);
      const previous = queryClient.getQueryData(["averias"]);
      queryClient.setQueryData(["averias"], (old) => [...(old || []), newUser]);
      return { previous };
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["averias"], context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["averias"]);
    },
  });
}

//////////////////////Actualizar usuario//////////////////////

export async function updateUser({ updatedUser }) {
  // 1. Lee el objeto completo del bin
  const response = await axios.get(USERS_API_URL, {
    headers: { "X-Access-Key": API_KEY },
  });
  const record = response.data.record || {};

  // 2. Trabaja solamente sobre la propiedad
  const averias = record.averias || [];

  // Verifica si el usuario con el ID proporcionado existe
  const userExists = averias.some(
    (user) => user.numAveria === updatedUser.numAveria
  );
  if (!userExists) {
    alert(
      `La averia numero ${updatedUser.numAveria} no se encuentra en el servidor.`
    );
    throw new Error(`La averia numero ${updatedUser.numAveria} no encontrado`);
  }

  // Actualiza el usuario con el mismo ID
  const updatedAveria = averias.map((user) =>
    user.numAveria === updatedUser.numAveria ? updatedUser : user
  );

  try {
    const response = await axios.put(
      USERS_API_URL,
      { ...record, averias: updatedAveria }, // Envía la lista actualizada a la API
      {
        headers: {
          "X-Access-Key": API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error updating user");
    }
    alert(`Averia numero ${updatedUser.numAveria} ha sido actualizado.`);
    return updatedUser; // Devuelve el usuario actualizado
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// Hook para manejar la actualización de usuarios
export function useUpdateUser() {
  const queryClient = useQueryClient();
  0;
  return useMutation({
    mutationFn: updateUser, // Función que realiza la actualización

    onMutate: async ({ updatedUser }) => {
      await queryClient.cancelQueries(["averias"]); // Cancela cualquier consulta en curso
      const previous = queryClient.getQueryData(["averias"]); // Obtiene los datos actuales en caché

      // Actualización optimista: esto significa que se actualiza el usuario en la caché antes de que la solicitud se complete
      queryClient.setQueryData(["averias"], (old) =>
        old
          ? old.map((user) =>
              user.numAveria === updatedUser.numAveria ? updatedUser : user
            )
          : []
      );

      return { previous }; // En caso de error, se revertirán los cambios
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["averias"], context.previous); // Revertir cambios si ocurre un error
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["averias"]);
    },
  });
}

//////////////////////Eliminar usuario//////////////////////

export async function deleteUser({ userId }) {
  // 1. Lee el objeto completo del bin
  const response = await axios.get(USERS_API_URL, {
    headers: { "X-Access-Key": API_KEY },
  });
  const record = response.data.record || {};

  // 2. Trabaja solamente sobre la propiedad
  const averias = record.averias || [];

  // Filtra al usuario que se desea eliminar
  const updatedAverias = averias.filter(
    (user) => String(user.numAveria) !== String(userId)
  );

  try {
    const response = await axios.put(
      USERS_API_URL,
      { ...record, averias: updatedAverias }, // Actualiza la lista sin el usuario eliminado
      {
        headers: {
          "X-Access-Key": API_KEY,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error deleting user");
    }
    alert(`La averia numero  ${userId} ha sido eliminada.`);
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
      await queryClient.cancelQueries(["averias"]); // Cancela cualquier consulta en curso
      const previous = queryClient.getQueryData(["averias"]); // Obtiene los datos actuales en caché

      // Actualización optimista: elimina el usuario de la caché antes de que la solicitud se complete
      queryClient.setQueryData(["averias"], (old) =>
        old ? old.filter((user) => user.numAveria !== userId) : []
      );

      return { previous }; // Devuelve los datos anteriores para revertir en caso de error
    },
    onError: (err, variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["averias"], context.previous); // Revertir cambios si ocurre un error
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["averias"]); // Invalida la consulta para recargar los datos actualizados
    },
  });
}
*/
