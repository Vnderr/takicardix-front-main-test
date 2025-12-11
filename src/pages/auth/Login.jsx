import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    correo: "",
    contrasena: "", 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const usuario = await login(credentials);


      if (
        (typeof usuario?.rol?.nombre === "string" &&
          usuario.rol.nombre.toUpperCase() === "ADMIN") ||
        usuario?.rol?.rol_id === 1
      ) {
        navigate("/admin/dashboard");
      } else {
        navigate("/"); 
      }
    } catch (err) {
      setError("Credenciales incorrectas. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Iniciar Sesión
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Accede a tu cuenta de Takicardix
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              name="correo"
              value={credentials.correo}
              onChange={handleChange}
              required
              placeholder="tu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="contrasena" 
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Tu contraseña"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${loading
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-black font-bold"
              }`}
          >
            {loading ? "Iniciando Sesión..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="text-center mt-6 pt-6 border-t border-gray-200">
          <p className="text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
