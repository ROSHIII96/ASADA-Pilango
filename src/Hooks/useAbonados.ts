import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addAbonado,
  getAbonados,
  deleteAbonado,
  updateAbonado,
} from "../Services/AuthAbonados";
import { useQuery } from "@tanstack/react-query";

interface AuthAbonados {
  numMedidor: number;
  cedula: number;
  name: string;
  email: string;
  direccion: string;
}

export function useAddAbonado() {
  const queryClient = useQueryClient();

  return useMutation({
    // 1) Llama a getAbonado con los datos del abonado
    mutationFn: async (params: AuthAbonados) => {
      return await addAbonado(params);
    },

    // 2) En éxito, puedes cachear los datos del abonado
    onSuccess: (abonado) => {
      queryClient.setQueryData(["abonado"], abonado);
    },

    // 3) En error, muestra el error
    onError: (err) => {
      console.error("Login abonado failed:", err);
    },
  });
}

export function useGetAbonados() {
  return useQuery({
    queryKey: ["abonados"],
    queryFn: getAbonados,
  });
}

export function useDeleteAbonado() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (numMedidor: number) => {
      return await deleteAbonado(numMedidor);
    },
    onSuccess: () => {
      alert("Abonado eliminado correctamente.");
      queryClient.invalidateQueries(["abonados"]);
    },
    onError: (err) => {
      console.error("Delete abonado failed:", err);
    },
  });
}

export function useUpdateAbonado() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (abonadoData: AuthAbonados) => {
      return await updateAbonado(abonadoData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["abonados"]);
    },
    onError: (err) => {
      console.error("Update abonado failed:", err);
    },
  });
}
