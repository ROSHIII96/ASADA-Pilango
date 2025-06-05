import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAbonado, getAbonados, deleteAbonado, updateAbonado } from "../Services/AuthAverias";
import { useQuery } from "@tanstack/react-query";

interface AuthAverias {
  id: number;
  numAveria: number;
  detalle: string;
  fecha: string;
  hora: string;
  latidud: number;
  longitud: number;
}

export function useAddAverias() {
  const queryClient = useQueryClient();

  return useMutation({
    // 1) Llama a getAbonado con los datos del abonado
    mutationFn: async (params: AuthAverias) => {
      return await addAbonado(params);
    },

    // 2) En éxito, puedes cachear los datos del abonado
    onSuccess: (abonado) => {
      queryClient.setQueryData(['abonado'], abonado);
    },

    // 3) En error, muestra el error
    onError: (err) => {
      console.error('Login abonado failed:', err);
    },
  });
}

export function useGetAbonados() {
  return useQuery({
    queryKey: ['abonados'],
    queryFn: getAbonados,
  });
}

export function useDeleteAbonado() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (numMedidor: string) => {
      return await deleteAbonado(numMedidor);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['abonados']);
    },
    onError: (err) => {
      console.error('Delete abonado failed:', err);
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
      queryClient.invalidateQueries(['abonados']);
    },
    onError: (err) => {
      console.error('Update abonado failed:', err);
    },
  });
}