import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "@tanstack/react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
    const router = useRouter(); // Usa el hook useRouter

  //const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const success = login(username, password);

    if (success) {
      // Log para depurar si se está alcanzando el bloque exitoso
      console.log("Inicio de sesión exitoso, redirigiendo...");
            router.navigate({ to: "/" }); // Redirige a la página de inicio (home)

      
      // Asegúrate de que navigate se está llamando correctamente
     // navigate("/"); // Redirige al Home

    } else {
      // En caso de error, mostrar mensaje de error
      setErrorMessage("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-10 p-4 shadow bg-white rounded">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"

          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button type="submit" className="w-full bg-sky-700 text-white py-2 rounded hover:bg-sky-800">
          Entrar
        </button>
      </form>

      {/* Mostrar un mensaje de error si las credenciales son incorrectas */}
      {errorMessage && (
        <div className="mt-4 p-2 bg-red-500 text-white rounded">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Login;
