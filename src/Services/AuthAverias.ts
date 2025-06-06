//importamos axios para hacer peticiones HTTP y
import axios from "axios";

//Definimos una interfaz AuthAverias que describe la estructura del objeto
//que se pasará a la función login
interface AuthAverias {
  id: number;
  numAveria: number;
  detalle: string;
  fecha: string;
  hora: string;
  latitud: string;
  longitud: string;
  estado: string;
  // ubicacion: string;
}

export const averia = axios.create({
  baseURL: "https://localhost:7098",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function addAveria({
  id,
  numAveria,
  detalle,
  fecha,
  hora,
  latitud,
  longitud,
  estado,
}: //ubicacion,
AuthAverias) {
  console.log({
    id,
    numAveria,
    detalle,
    fecha,
    hora,
    /*ubicacion*/ latitud,
    longitud,
    estado,
  });
  const { data } = await averia.post(
    "/api/Averias/getAveria", //Login es para el endpoint de autenticación en la API, es un nombre que se asigna para identificar la ruta de inicio de sesión.
    {
      id,
      numAveria,
      detalle,
      fecha,
      hora,
      latitud,
      longitud,
      estado,
      //ubicacion,
    }
  );
  return data.averia;
}

export async function getAverias() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { data } = await averia.get("/api/Averias");
  return data;
}

export async function deleteAveria(numAveria: number) {
  const { data } = await averia.delete(`/api/Averias/${numAveria}`);
  return data;
}

export async function updateAveria(averiaData: AuthAverias) {
  const { data } = await averia.put(
    `/api/Averias/${averiaData.numAveria}`,
    averiaData
  );
  return data;
}
