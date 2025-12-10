import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MetodoEnvioService from "../../../services/MetodoEnvio";
import RegionService from "../../../services/Region";
import ComunaService from "../../../services/Comuna";
import Text from "../../../components/atoms/Text";
import Button from "../../../components/atoms/Button";

function HomeLogistica() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalMetodosEnvio: 0,
    totalRegiones: 0,
    totalComunas: 0,
    enviosGratis: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [metodosEnvio, regiones, comunas] = await Promise.all([
          MetodoEnvioService.getAllMetodosEnvios(),
          RegionService.getAllRegiones(),
          ComunaService.getAllComunas(),
        ]);

        const enviosGratis = metodosEnvio.filter(
          (envio) => envio.costo === 0
        ).length;

        setStats({
          totalMetodosEnvio: metodosEnvio.length,
          totalRegiones: regiones.length,
          totalComunas: comunas.length,
          enviosGratis: enviosGratis,
        });
      } catch (error) {
        console.error("Error cargando estadísticas de logística:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando estadísticas de logística...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Text variant="h1" className="text-3xl font-bold text-gray-900">
          Gestión Logística
        </Text>
        <Text variant="p" className="text-gray-600 mt-2">
          Administra métodos de envío y cobertura geográfica
        </Text>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Métodos de Envío
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-blue-600">
            {stats.totalMetodosEnvio}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Opciones disponibles
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Regiones
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-green-600">
            {stats.totalRegiones}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Regiones cubiertas
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Comunas
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-purple-600">
            {stats.totalComunas}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Comunas disponibles
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Envíos Gratis
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-orange-600">
            {stats.enviosGratis}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Métodos sin costo
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
            onClick={() => navigate("/admin/logistica/envios")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3"
            text="Gestionar Envíos"
          />

          <Button
            onClick={() => navigate("/admin/logistica/regiones")}
            className="bg-green-500 hover:bg-green-600 text-white py-3"
            text="Administrar Regiones"
          />

          <Button
            onClick={() => navigate("/admin/logistica")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3"
            text="Configurar Cobertura"
          />
        </div>
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Resumen Logístico
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Cobertura nacional: {stats.totalRegiones > 0 ? "Sí" : "No"}
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Método más usado: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            Costo promedio envío: Por implementar
          </Text>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Acciones Pendientes
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Actualizar costos: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Expandir cobertura: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            Optimizar rutas: Por implementar
          </Text>
        </div>
      </div>
    </div>
  );
}

export default HomeLogistica;
