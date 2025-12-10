import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import ProductoService from "../../services/Producto";

function Home() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const { addToCart } = useAuth();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await ProductoService.getAllProductos();
        setProductos(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };
    fetchProductos();
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      producto_id: product.producto_id,
      nombre: product.nombre,
      precio: product.precio,
      imageUrl: product.imageUrl,
      cantidad: 1,
    });
    alert(`¡${product.nombre} agregado al carrito!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-green-500">TAKICARDIX</span>
            <span className="text-red-500"> ENERGY</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Energía y rendimiento en cada bebida
          </p>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Productos destacados
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productos.slice(0, 4).map((product) => (
              <div
                key={product.producto_id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={product.imageUrl}
                  alt={product.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {product.nombre}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.descripcion}
                  </p>
                  <p className="text-green-600 font-bold text-xl mb-4">
                    ${product.precio}
                  </p>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() =>
                        navigate(`/product/${product.producto_id}`)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                    >
                      Ver detalles
                    </button>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-colors"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
