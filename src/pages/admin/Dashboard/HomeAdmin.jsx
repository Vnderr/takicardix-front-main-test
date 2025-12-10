import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductoService from "../../../services/Producto";
import VentaService from "../../../services/Venta";
import UsuarioService from "../../../services/Usuario";
import Text from "../../../components/atoms/Text";
import Button from "../../../components/atoms/Button";

function HomeAdmin() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProductos: 0,
    totalVentas: 0,
    totalUsuarios: 0,
    ventasDelMes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [productos, ventas, usuarios] = await Promise.all([
          ProductoService.getAllProductos(),
          VentaService.getAllVentas(),
          UsuarioService.getAllUsuarios(),
        ]);

        const hoy = new Date();
        const ventasMes = ventas.filter((venta) => {
          const fechaVenta = new Date(venta.fecha_venta);
          return (
            fechaVenta.getMonth() === hoy.getMonth() &&
            fechaVenta.getFullYear() === hoy.getFullYear()
          );
        });

        setStats({
          totalProductos: productos.length,
          totalVentas: ventas.length,
          totalUsuarios: usuarios.length,
          ventasDelMes: ventasMes.length,
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
        <Text variant="p">Cargando dashboard...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Text variant="h1" className="text-3xl font-bold text-gray-900">
          Panel de Administración
        </Text>
        <Text variant="p" className="text-gray-600 mt-2">
          Resumen general del sistema
        </Text>
      </div>

      {/* Estadísticas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Total de Productos
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-blue-600">
            {stats.totalProductos}
          </Text>
          <Button
            onClick={() => navigate("/admin/productos")}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm"
            text="Gestionar Productos"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Total de Ventas
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-green-600">
            {stats.totalVentas}
          </Text>
          <Button
            onClick={() => navigate("/admin/ventas")}
            className="mt-3 bg-green-500 hover:bg-green-600 text-white text-sm"
            text="Ver Ventas"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Usuarios Registrados
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-purple-600">
            {stats.totalUsuarios}
          </Text>
          <Button
            onClick={() => navigate("/admin/usuarios")}
            className="mt-3 bg-purple-500 hover:bg-purple-600 text-white text-sm"
            text="Gestionar Usuarios"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Ventas del Mes
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-orange-600">
            {stats.ventasDelMes}
          </Text>
          <Button
            onClick={() => navigate("/admin/ventas")}
            className="mt-3 bg-orange-500 hover:bg-orange-600 text-white text-sm"
            text="Ver Reportes"
          />
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
        <Text variant="h2" className="text-xl font-semibold mb-4">
          Acciones Rápidas
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate("/admin/productos/listar")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3"
            text="Gestionar Productos"
          />

          <Button
            onClick={() => navigate("/admin/ventas")}
            className="bg-green-500 hover:bg-green-600 text-white py-3"
            text="Ver Todas las Ventas"
          />

          <Button
            onClick={() => navigate("/admin/usuarios")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3"
            text="Administrar Usuarios"
          />
        </div>
      </div>

      {/* Información del Sistema */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Actividad Reciente
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Ultima venta: Hoy
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Productos agregados: 0
          </Text>
          <Text variant="p" className="text-gray-600">
            Usuarios nuevos: 0
          </Text>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Tareas Pendientes
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Revisar inventario: Pendiente
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Actualizar precios: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            Generar reportes: Por implementar
          </Text>
        </div>
      </div>
    </div>
  );
}

export default HomeAdmin;
