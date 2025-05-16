// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user" | "fontanero";  // Se agrega el rol para cada usuario
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const validUsers: User[] = [
    {
      email: "geraldalv9@gmail.com",
      password: "g",
      name: "Gerald Alvarez",
      role: "admin"  
    },
    {
      email: "fontanero@gmail.com",
      password: "f",
      name: "Mauricio",
      role: "fontanero"  
    },
    {
      email: "cobros@gmail.com",
      password: "c",
      name: "Liliana",
      role: "user"  
    },
    {
      email: "josephmanuelva@gmail.com",
      password: "j",
      name: "Joseth Vargas",
      role: "admin"
    },
    {
      email: "eporrascastro@yahoo.com",
      password: "e",
      name: "Emmanuel Porras",
      role: "admin"
    }
  ];

  const login = (email: string, password: string): boolean => {
    const foundUser = validUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setIsAuthenticated(true);
      setUser(foundUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
