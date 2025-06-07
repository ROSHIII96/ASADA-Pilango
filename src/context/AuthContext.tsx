// src/context/AuthContext.tsx
import React, { useContext, ReactNode } from "react";
import { createContext, useState, useEffect, useRef } from "react";
import { useLogin } from "../Hooks/useLogin";
import { decodeToken, client as axiosClient } from "../Services/AuthService";

interface User {
  email: string;
  password: string;
  name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (
    email: string,
    password: string,
    rememberMe?: boolean
  ) => Promise<any>;
  logout: () => void;
  token: string | null;
  loginLoading: boolean;
  loginError: boolean;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

//Para obtener el role de forma dinamica
const ROLE_CLAIM_KEY =
  (typeof process !== "undefined" && process.env.REACT_APP_ROLE_CLAIM_KEY) ||
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
// Función para normalizar el usuario y extraer el role dinámicamente
const normalizeUser = (jwtPayload) => {
  const fallbackRoleKey = Object.keys(jwtPayload).find((key) =>
    key.toLowerCase().includes("role")
  );
  const roleKey = ROLE_CLAIM_KEY || fallbackRoleKey;

  return {
    ...jwtPayload,
    role: roleKey ? jwtPayload[roleKey] : undefined,
  };
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const logoutTimer = useRef(null);
  const { mutateAsync: loginMutation, isLoading, isError } = useLogin();

  // Para programar el logout automático
  const scheduleAutoLogout = (jwt) => {
    if (!jwt) return;
    const { exp } = decodeToken(jwt);
    if (!exp) return;
    //Esta linea hace los calculos para 5 segundos antes que el token expire
    const expiryMs = exp * 1000 - Date.now() - 5000;
    if (expiryMs > 0) {
      logoutTimer.current = setTimeout(() => {
        logout();
        alert("Su sesión ha expirado. Por favor, inicie sesión nuevamente.");
      }, expiryMs);
    }
  };

  // Limpia el timer si cambia el token o desmonta el componente
  useEffect(() => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    if (token) scheduleAutoLogout(token);
    // Limpia al desmontar
    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [token]);

  //Funcion para iniciar sesion
  const login = async (email: string, password: string, rememberMe) => {
    setLoading(false);
    try {
      const newToken = await loginMutation({ email, password });
      if (rememberMe) {
        localStorage.setItem("authToken", newToken);
        sessionStorage.removeItem("authToken");
      } else {
        sessionStorage.setItem("authToken", newToken);
        localStorage.removeItem("authToken");
      }
      setToken(newToken);
      const data = decodeToken(newToken);
      setUser(normalizeUser(data)); // Normaliza el usuario y extrae el rol dinámicamente
      setIsAuthenticated(true);
      setUser(foundUser);
      //Lo que hace es esperar 500ms, para que luego se muestre que se inicio sesion correctamente
      await new Promise((resolve) => setTimeout(resolve, 500));
      return data;
    } finally {
      setLoading(true);
    }
  };

  //Cuando se cierra sesion
  const logout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    // delete axiosClient.defaults.headers.common.Authorization
    setIsAuthenticated(false);
    setToken(null);
    setUser(null);
    setLoading(false);
  };

  // Cargar el token y usuario desde localStorage o sessionStorage al iniciar
  useEffect(() => {
    const stored =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (stored) {
      setToken(stored);
      const data = decodeToken(stored);
      //setUser({ email: data.email, ...data })
      setUser(normalizeUser(data));
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        token,
        loginLoading: isLoading,
        loginError: isError,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth  debe usarse dentro de un AuthProvider");
  }
  return context;
};
