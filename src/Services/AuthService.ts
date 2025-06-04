//importamos axios para hacer peticiones HTTP y 
// jwtDecode para decodificar el token JWT.
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

//Definimos una interfaz AuthService que describe la estructura del objeto
//que se pasará a la función login
interface AuthService {
  email: string;
  password: string;
}

export const client = axios.create({
  baseURL: 'https://localhost:7098',
    headers: {
        'Content-Type': 'application/json',
        },
})

export async function login({email, password} : AuthService) {
  const { data } = await client.post('/login',  //Login es para el endpoint de autenticación en la API, es un nombre que se asigna para identificar la ruta de inicio de sesión.
    {
      email,
      password
    })
    return data.token
}

export function decodeToken(token) {
    return jwtDecode(token)
}