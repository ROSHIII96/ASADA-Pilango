//importamos axios para hacer peticiones HTTP y
import axios from "axios";

//Definimos una interfaz AuthService que describe la estructura del objeto
//que se pasará a la función login
interface AuthAbonados {
  numMedidor: number;
  cedula: number;
  name: string;
  email: string;
  direccion: string;
}

export const abonado = axios.create({
  baseURL: "https://localhost:7098",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function addAbonado({
  numMedidor,
  cedula,
  name,
  email,
  direccion,
}: AuthAbonados) {
  console.log({ numMedidor, cedula, name, email, direccion });
  const { data } = await abonado.post(
    "/api/Abonados/getAbonado", //Login es para el endpoint de autenticación en la API, es un nombre que se asigna para identificar la ruta de inicio de sesión.
    {
      numMedidor,
      cedula,
      name,
      email,
      direccion,
    }
  );
  return data.abonado;
}

export async function getAbonados() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const { data } = await abonado.get("/api/Abonados");
  return data;
}

export async function deleteAbonado(numMedidor: number) {
  const { data } = await abonado.delete(`/api/Abonados/${numMedidor}`);
  return data;
}

export async function updateAbonado(abonadoData: AuthAbonados) {
  const { data } = await abonado.put(
    `/api/Abonados/${abonadoData.numMedidor}`,
    abonadoData
  );
  return data;
}
