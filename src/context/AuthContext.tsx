// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  email: string;
  password: string;
  name: string;
  role: "admin" | "user";  // Agregamos el rol
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Usuarios permitidos con su rol
  const validUsers: User[] = [
    {
      email: "geraldalv9@gmail.com",
      password: "Gerald.13",
      name: "Gerald Alvarez",
      role: "user"  
    },
    {
      email: "1@gmail.com",
      password: "1",
      name: "PUTO",
      role: "user"  
    },
    {
      email: "Joseth.vargas.venegas@est.una.ac.cr",
      password: "Joseth",
      name: "Joseth Vargas",
      role: "user"
    },
    {
      email: "eporrascastro2004@gmail.com",
      password: "Emmanuel",
      name: "Emmanuel Porras",
      role: "user"
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
