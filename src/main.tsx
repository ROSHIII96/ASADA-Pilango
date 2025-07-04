import ReactDOM from "react-dom/client";
import "./index.css"; //Se monta en toda la aplicacion
import { AuthProvider } from "./context/AuthContext"; // Importar el provider
import router from "./routes.tsx";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter } from "react-router-dom";

//Este if es para que al recargar la pagina, siempre se redirija a la pagina de inicio
if (window.location.pathname !== "/") {
  window.location.replace("/");
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
