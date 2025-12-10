import { useState, useEffect } from "react";
import VentaService from "../../../services/Venta";
import DynamicTable from "../../../components/molecules/DynamicTable";
import Text from "../../../components/atoms/Text";

function ListarVentas() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVentas = async () => {
      try {
        const ventasData = await VentaService.getAllVentas();
        setVentas(ventasData);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVentas();
  }, []);

  const columns = [
    { key: "venta_id", label: "ID Venta" },
    {
      key: "fecha_venta",
      label: "Fecha",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "usuario",
      label: "Cliente",
      render: (value) => value?.nombre || "N/A",
    },
    {
      key: "monto",
      label: "Monto",
      render: (value) => `$${value?.toLocaleString()}`,
    },
    {
      key: "metodoPago",
      label: "Método Pago",
      render: (value) => value?.nombre || "N/A",
    },
    {
      key: "metodoEnvio",
      label: "Método Envío",
      render: (value) => value?.nombre || "N/A",
    },
    {
      key: "estado",
      label: "Estado",
      render: (value) => value?.nombre || "N/A",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleViewDetails(row.venta_id)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Ver Detalle
          </button>
        </div>
      ),
    },
  ];

  const handleViewDetails = (ventaId) => {
    window.location.href = `/order/${ventaId}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando ventas...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Text variant="h1" className="text-2xl font-bold">
          Listado de Ventas
        </Text>
        <Text variant="p" className="text-gray-600 mt-2">
          Todas las ventas registradas en el sistema
        </Text>
      </div>

      {/* Tabla de ventas */}
      <DynamicTable
        data={ventas}
        columns={columns}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
}

export default ListarVentas;
