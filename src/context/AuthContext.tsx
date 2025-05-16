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

  // Usuarios permitidos con su rol
  const validUsers: User[] = [
    {
      email: "geraldalv9@gmail.com",
      password: "Gerald.13",
      name: "Gerald Alvarez",
      role: "admin"  
    },
    {
      email: "fontanero@gmail.com",
      password: "1",
      name: "Mauricio",
      role: "fontanero"  
    },
    {
      email: "2@gmail.com",
      password: "2",
      name: "Joseth Vargas",
      role: "user"
    },
    {
      email: "eporrascastro@yahoo.com",
      password: "1",
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
