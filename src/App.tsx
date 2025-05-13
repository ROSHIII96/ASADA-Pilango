// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import QuienesSomosPage from "./Pages/QuienesSomosPage";
import ListaAbonadosPage from "./Pages/ListaAbonadosPage";
import AgregarAbonadoPage from "./Pages/AgregarAbonadoPage";
import EditarAbonadoPage from "./Pages/EditarAbonadoPage";
import EliminarAbonadoPage from "./Pages/EliminarAbonadoPage";
import ReportesPage from "./Pages/ReportesPage"; // Página pública para reportar averías
import ListaReportesPage from "./Pages/ListaReportesPage"; // Página protegida para ver reportes
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/quienes-somos" element={<QuienesSomosPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route
          path="/reportes/lista"
          element={isAuthenticated ? <ListaReportesPage /> : <LoginPage />}
        />
        <Route
          path="/abonados"
          element={isAuthenticated ? <ListaAbonadosPage /> : <LoginPage />}
        />
        <Route
          path="/abonados/agregar"
          element={isAuthenticated ? <AgregarAbonadoPage /> : <LoginPage />}
        />
        <Route
          path="/abonados/editar/:id"
          element={isAuthenticated ? <EditarAbonadoPage /> : <LoginPage />}
        />
        <Route
          path="/abonados/eliminar/:id"
          element={isAuthenticated ? <EliminarAbonadoPage /> : <LoginPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
