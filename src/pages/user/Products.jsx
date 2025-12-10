import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProductoService from "../../services/Producto";
import MarcaService from "../../services/Marca";

function Products() {
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [orden, setOrden] = useState("");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosData, marcasData] = await Promise.all([
          ProductoService.getAllProductos(),
          MarcaService.getAllMarcas(),
        ]);
        setProductos(productosData);
        setMarcas(marcasData);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const productosFiltrados = productos
    .filter(
      (product) =>
        !marcaSeleccionada ||
        product.marca?.marca_id === parseInt(marcaSeleccionada)
    )
    .sort((a, b) => {
      if (orden === "precio_asc") return a.precio - b.precio;
      if (orden === "precio_desc") return b.precio - a.precio;
      if (orden === "nombre_asc") return a.nombre.localeCompare(b.nombre);
      return 0;
    });

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Cargando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Productos</h1>

        {/* Filtros simples */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={marcaSeleccionada}
              onChange={(e) => setMarcaSeleccionada(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">Todas las marcas</option>
              {marcas.map((marca) => (
                <option key={marca.marca_id} value={marca.marca_id}>
                  {marca.nombre}
                </option>
              ))}
            </select>

            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="border rounded px-3 py-2"
            >
              <option value="">Ordenar por</option>
              <option value="precio_asc">Precio: Menor a Mayor</option>
              <option value="precio_desc">Precio: Mayor a Menor</option>
              <option value="nombre_asc">Nombre: A-Z</option>
            </select>

            <span className="text-gray-600">
              {productosFiltrados.length} productos
            </span>

            {(marcaSeleccionada || orden) && (
              <button
                onClick={() => {
                  setMarcaSeleccionada("");
                  setOrden("");
                }}
                className="text-blue-600 hover:text-blue-800"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((product) => (
            <div
              key={product.producto_id}
              className="bg-white rounded-lg shadow border"
            >
              <img
                src={product.imageUrl}
                alt={product.nombre}
                className="w-full h-48 object-cover rounded-t-lg"
              />

              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{product.nombre}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {product.marca?.nombre}
                </p>
                <p className="text-green-600 font-bold text-xl mb-3">
                  ${product.precio}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/product/${product.producto_id}`)}
                    className="flex-1 bg-blue-500 text-white py-2 rounded text-sm"
                  >
                    Detalles
                  </button>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-green-500 text-white py-2 rounded text-sm"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productosFiltrados.length === 0 && (
          <div className="text-center py-8">
            <p>No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
