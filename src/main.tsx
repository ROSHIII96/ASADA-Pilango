
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // Importar el provider

import router from './routes.tsx'
import { RouterProvider } from '@tanstack/react-router'

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <AuthProvider>
    <RouterProvider router = {router}/>
  </AuthProvider>
   </React.StrictMode>
   ,
);

/*
<React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>*/