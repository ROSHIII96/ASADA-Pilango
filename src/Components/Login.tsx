import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "@tanstack/react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter(); 
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

  const success = login(username, password);
   if (success) {
  setSuccessMessage("--->>> Inicio de sesión exitoso <<<---");
  setTimeout(() => {
    setSuccessMessage(null);
    router.navigate({ to: "/" });
  }, 1500); // Muestra el mensaje 1.5 segundos antes de redirigir
} else {
      // En caso de error, muestra el mensaje
      setErrorMessage("Usuario o contraseña incorrectos");
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

      {/* Hace que se muestre la animacion si las credenciales son correctas */}
      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-600 text-white px-8 py-6 rounded-xl shadow-2xl text-2xl font-bold animate-bounce border-4 border-green-800">
            {successMessage}
          </div>
        </div>
      )}

      {/* Muestra un mensaje de error si las credenciales son incorrectas */}
      {errorMessage && (
        <div className="mt-6 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-3 bg-red-600 text-white rounded-lg shadow-lg border-l-4 border-red-800 animate-shake">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.918-.816 1.995-1.85l.007-.15V6c0-1.054-.816-1.918-1.85-1.995L19 4H5c-1.054 0-1.918.816-1.995 1.85L3 6v12c0 1.054.816 1.918 1.85 1.995L5 20zm7-16v2m0 4v2m0 4v2" />
            </svg>
            <span className="font-semibold">{errorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
