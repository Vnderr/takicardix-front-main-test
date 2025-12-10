import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductoService from "../../../services/Producto";
import Text from "../../../components/atoms/Text";
import Button from "../../../components/atoms/Button";

function HomeProductos() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProductos: 0,
    productosActivos: 0,
    precioPromedio: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const productos = await ProductoService.getAllProductos();
        const total = productos.length;
        const precioPromedio =
          total > 0
            ? productos.reduce((sum, p) => sum + (p.precio || 0), 0) / total
            : 0;

        setStats({
          totalProductos: total,
          productosActivos: total,
          precioPromedio: Math.round(precioPromedio),
        });
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Text variant="h1" className="text-3xl font-bold text-gray-900">
          Gestión de Productos
        </Text>
        <Text variant="p" className="text-gray-600 mt-2">
          Administra el catálogo de productos de tu tienda
        </Text>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Total de Productos
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-blue-600">
            {stats.totalProductos}
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Productos Activos
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-green-600">
            {stats.productosActivos}
          </Text>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-md border">
        <Text variant="h2" className="text-xl font-semibold mb-4">
          Acciones Rápidas
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={() => navigate("/admin/productos/listar")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3"
            text="Ver Todos los Productos"
          />

          <Button
            onClick={() => navigate("/admin/productos/listar")}
            className="bg-green-500 hover:bg-green-600 text-white py-3"
            text="Crear Nuevo Producto"
          />

          <Button
            onClick={() => navigate("/admin/productos")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3"
            text="Gestionar Inventario"
          />

          <Button
            onClick={() => navigate("/admin/productos")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3"
            text="Reportes de Productos"
          />
        </div>
      </div>

      {/* Información Adicional */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Resumen del Mes
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            • Productos agregados este mes: 0
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            • Productos más vendidos: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            • Stock bajo: Por implementar
          </Text>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Acciones Pendientes
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            • Revisar productos sin imagen: 0
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            • Actualizar precios: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            • Categorizar productos: Por implementar
          </Text>
        </div>
      </div>
    </div>
  );
}

export default HomeProductos;
