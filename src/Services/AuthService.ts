import axios from 'axios'
import { jwtDecode } from 'jwt-decode'


export const client = axios.create({
  baseURL: 'https://localhost:7098',
    headers: {
        'Content-Type': 'application/json',
        },
})

/*
interface LoginParams {
  email: string;
  password: string;
}

export async function login({email, password}: LoginParams) {
  const { data } = await client.post('/login', 
    {
      email,
      password
    })
    return data.token
}*/

export async function login({email, password}) {
  const { data } = await client.post('/login',  //Login es para el endpoint de autenticación en la API, es un nombre que se asigna para identificar la ruta de inicio de sesión.
    {
      email,
      password
    })
    return data.token
}

/*
export interface DecodedToken {
    [key: string]: any;
}*/

export function decodeToken(token) {
    return jwtDecode(token)
}