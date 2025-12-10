import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";

function Navbar({ links = [], title = "Takicardix" }) {
  const { user, logout, getCartItemsCount } = useAuth();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <nav className="bg-black text-white py-4 border-b-2 border-green-500">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        {/* Logo/Título */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-green-500 hover:text-green-400 transition-colors"
          >
            {title}
          </Link>
        </div>

        {/* Links de Navegación */}
        <div className="hidden md:flex space-x-6">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="text-white hover:text-green-500 transition-colors font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Sección de Usuario */}
        <div className="flex items-center space-x-4">
          {/* Carrito - SOLO EN RUTAS NO ADMIN */}
          {!isAdminRoute && (
            <Link
              to="/cart"
              className="relative text-white hover:text-green-500 transition-colors"
            >
              Carrito
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          )}

          {/* Estado de Usuario */}
          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/profile"
                className="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded transition-colors font-medium"
              >
                {user.nombre || user.correo}
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded transition-colors font-medium"
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                className="bg-blue-500 hover:bg-blue-600 text-black px-3 py-1 rounded transition-colors font-medium"
              >
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
