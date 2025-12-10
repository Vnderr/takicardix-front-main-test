import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import VentaService from "../../services/Venta";
import { useNavigate } from "react-router-dom";

function Orders() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVentas = async () => {
      try {
        const ventasData = await VentaService.getVentasByUsuario(
          user.usuario_id
        );
        setVentas(ventasData);
      } catch (error) {
        console.error("Error cargando ventas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadVentas();
    }
  }, [user]);

  if (loading) {
    return <div>Cargando pedidos...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto my-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Mis Pedidos</h1>

      {ventas.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600">No tienes pedidos realizados</p>
        </div>
      ) : (
        <div className="space-y-4">
          {ventas.map((venta) => (
            <div
              key={venta.venta_id}
              className="bg-white p-6 rounded-lg shadow-md border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">
                    Pedido #{venta.venta_id}
                  </h3>
                  <p className="text-gray-600">Fecha: {venta.fecha_venta}</p>
                  <p className="text-gray-600">
                    Total: ${venta.monto?.toLocaleString()}
                  </p>
                  <p className="text-gray-600">
                    Estado: {venta.estado?.nombre}
                  </p>
                </div>
                <button
                  onClick={() => navigate(`/order/${venta.venta_id}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Ver Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
