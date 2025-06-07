import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addAveria,
  getAverias,
  deleteAveria,
  updateAveria,
} from "../Services/AuthAverias";
import { useQuery } from "@tanstack/react-query";

interface AuthAverias {
  id: number;
  numAveria: number;
  detalle: string;
  fecha: string;
  hora: string;
  latitud: string;
  longitud: string;
  estado: string;
  //ubicacion: string;
}

export function useAddAveria() {
  const queryClient = useQueryClient();

  return useMutation({
    // 1) Llama a getAbonado con los datos del abonado
    mutationFn: async (params: AuthAverias) => {
      return await addAveria(params);
    },

    // 2) En éxito, puedes cachear los datos del abonado
    onSuccess: (averia) => {
      queryClient.setQueryData(["averia"], averia);
    },

    // 3) En error, muestra el error
    onError: (err) => {
      console.error("Login averia failed:", err);
    },
  });
}

export function useGetAverias() {
  return useQuery({
    queryKey: ["averias"],
    queryFn: getAverias,
  });
}

export function useDeleteAveria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (numAveria: number) => {
      return await deleteAveria(numAveria);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["averias"]);
    },
    onError: (err) => {
      console.error("Delete averia failed:", err);
    },
  });
}

export function useUpdateAveria() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (averiaData: AuthAverias) => {
      return await updateAveria(averiaData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["averias"]);
    },
    onError: (err) => {
      console.error("Update averias failed:", err);
    },
  });
}
