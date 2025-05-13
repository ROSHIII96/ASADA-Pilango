import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      alert("Inicio de sesión exitoso");
      navigate("/"); // Redirige al Home después del login exitoso
    } else {
      alert("Correo o contraseña incorrectos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-sky-800">
          Iniciar Sesión
        </h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Correo electrónico</label>
          <input
            type="email"
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block mb-2 text-sm font-medium">Contraseña</label>
          <input
            type={showPassword ? "text" : "password"}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-9 right-3 text-gray-600 hover:text-gray-800"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-sky-700 text-white py-2 rounded-lg font-semibold hover:bg-sky-800"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginPage;