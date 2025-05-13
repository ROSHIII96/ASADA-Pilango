// src/routes.tsx
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import QuienesSomosPage from "./Pages/QuienesSomosPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/quienes-somos",
    element: <QuienesSomosPage />,
  },
]);

export default router;
