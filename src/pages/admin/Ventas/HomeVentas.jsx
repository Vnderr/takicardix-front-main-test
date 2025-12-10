import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import VentaService from "../../../services/Venta";
import Text from "../../../components/atoms/Text";
import Button from "../../../components/atoms/Button";

function HomeVentas() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalVentas: 0,
    ventasMes: 0,
    ingresosTotales: 0,
    ingresosMes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const ventas = await VentaService.getAllVentas();
        const hoy = new Date();
        const mesActual = hoy.getMonth();
        const añoActual = hoy.getFullYear();

        const ventasMes = ventas.filter((venta) => {
          const fechaVenta = new Date(venta.fecha_venta);
          return (
            fechaVenta.getMonth() === mesActual &&
            fechaVenta.getFullYear() === añoActual
          );
        });

        const ingresosTotales = ventas.reduce(
          (sum, venta) => sum + (venta.monto || 0),
          0
        );
        const ingresosMes = ventasMes.reduce(
          (sum, venta) => sum + (venta.monto || 0),
          0
        );

        setStats({
          totalVentas: ventas.length,
          ventasMes: ventasMes.length,
          ingresosTotales: Math.round(ingresosTotales),
          ingresosMes: Math.round(ingresosMes),
        });
      } catch (error) {
        console.error("Error cargando estadísticas de ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando estadísticas de ventas...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Text variant="h1" className="text-3xl font-bold text-gray-900">
          Gestión de Ventas
        </Text>
        <Text variant="p" className="text-gray-600 mt-2">
          Administra y monitorea las ventas de tu tienda
        </Text>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Total de Ventas
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-blue-600">
            {stats.totalVentas}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Todas las ventas registradas
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Ventas del Mes
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-green-600">
            {stats.ventasMes}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Mes actual
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Ingresos Totales
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-purple-600">
            ${stats.ingresosTotales?.toLocaleString()}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Ingresos acumulados
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Ingresos del Mes
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-orange-600">
            ${stats.ingresosMes?.toLocaleString()}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Mes actual
          </Text>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
        <Text variant="h2" className="text-xl font-semibold mb-4">
          Acciones Rápidas
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate("/admin/ventas/listar")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3"
            text="Ver Todas las Ventas"
          />

          <Button
            onClick={() => navigate("/admin/ventas")}
            className="bg-green-500 hover:bg-green-600 text-white py-3"
            text="Generar Reportes"
          />

          <Button
            onClick={() => navigate("/admin/ventas")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3"
            text="Estadísticas Avanzadas"
          />
        </div>
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Resumen de Ventas
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Promedio por venta: $
            {stats.totalVentas > 0
              ? Math.round(
                  stats.ingresosTotales / stats.totalVentas
                )?.toLocaleString()
              : 0}
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Tasa de crecimiento: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            Ventas pendientes: Por implementar
          </Text>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Acciones Pendientes
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Revisar ventas recientes: {stats.ventasMes} este mes
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Exportar reportes: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            Analizar tendencias: Por implementar
          </Text>
        </div>
      </div>
    </div>
  );
}

export default HomeVentas;
