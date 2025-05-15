import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext"; // Importar el provider
import router from './routes.tsx'
import { RouterProvider } from '@tanstack/react-router'

//Este if es para que al recargar la pagina, siempre se redirija a la pagina de inicio
if (window.location.pathname !== "/") {
  window.location.replace("/");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
  <AuthProvider>
    <RouterProvider router = {router}/>
  </AuthProvider>
   </React.StrictMode>
   ,
);