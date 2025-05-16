//import React from "react";
import ReactDOM from "react-dom/client";
//import App from "./App.tsx";
import "./index.css";  //Se monta en toda la aplicacion
import { AuthProvider } from "./context/AuthContext"; // Importar el provider
import router from './routes.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


//Este if es para que al recargar la pagina, siempre se redirija a la pagina de inicio
if (window.location.pathname !== "/") {
  window.location.replace("/");
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
 // <React.StrictMode>
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router = {router}/>
    </QueryClientProvider>
  </AuthProvider>
   //</React.StrictMode>
   ,
);