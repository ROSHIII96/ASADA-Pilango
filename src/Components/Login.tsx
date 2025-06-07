import { useRef, useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "@tanstack/react-router";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { login, loginLoading, loginError, isAuthenticated, logout } =
    useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const result = await login(
      emailRef.current.value,
      passwordRef.current.value,
      rememberMe
    );
    if (result) {
      setSuccessMessage("--->>> Inicio de sesión exitoso <<<---");
      setTimeout(() => {
        setSuccessMessage(null);
        router.navigate({ to: "/" });
      }, 700);
    } else {
      setErrorMessage("Usuario o contraseña incorrectos");
    }
  };

  const handleLogout = () => {
    logout();
  };

  if (isAuthenticated) {
    return (
      <div className="p-4 text-green-600 font-bold">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
        >
          Cerrar sesión
        </button>
        {successMessage && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-green-600 text-white px-8 py-6 rounded-xl shadow-2xl text-2xl font-bold animate-bounce border-4 border-green-800">
              {successMessage}
            </div>
          </div>
        )}
        Ingresado exitosamente...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow"
    >
      <input
        ref={emailRef}
        placeholder="Correo"
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <input
        type="password"
        ref={passwordRef}
        placeholder="Contraseña"
        className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        disabled={loginLoading}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition disabled:opacity-50"
      >
        Ingresar
      </button>

      <input
        type="checkbox"
        checked={rememberMe}
        onChange={(e) => setRememberMe(e.target.checked)}
        id="rememberMe"
      />
      <label htmlFor="rememberMe" className="ml-2">
        Recordarme
      </label>

      {(loginError || errorMessage) && (
        <p className="mt-2 text-sm text-red-600">
          Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.
        </p>
      )}
    </form>
  );
};

export default Login;
