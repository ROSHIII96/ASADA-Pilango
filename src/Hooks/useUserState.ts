import { useState, useRef } from 'react';

export function useUserState() {
  // Referencias con tipos explícitos
  const emailRef = useRef<string>("");
  const passwordRef = useRef<string>("");

  const [error, setError] = useState<string>(''); // Asegúrate de que el estado de error sea un string

  // Login con parámetros con tipo explícito
  const login = (email: string, password: string): boolean => {
    if (email === "a" && password === "1") {
      return true;
    }
    return false;
  };

  return { error, emailRef, passwordRef, login, setError };
}
