import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VentaService from "../../services/Venta";

function OrderDetail() {
  const { id } = useParams();
  const [venta, setVenta] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVenta = async () => {
      try {
        const ventaData = await VentaService.getVentaById(id);
        setVenta(ventaData);
      } catch (error) {
        console.error("Error cargando venta:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVenta();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (!venta) return <div>Pedido no encontrado</div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-6">
      <h1 className="text-3xl font-bold mb-6">
        Detalle del Pedido #{venta.venta_id}
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Información del Pedido</h3>
            <p>Fecha: {venta.fecha_venta}</p>
            <p>Total: ${venta.monto?.toLocaleString()}</p>
            <p>Estado: {venta.estado?.nombre}</p>
          </div>
          <div>
            <h3 className="font-semibold">Método de Pago</h3>
            <p>{venta.metodoPago?.nombre}</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Dirección de Envío</h3>
          <p>{venta.direccion}</p>
          <p>
            {venta.comuna?.nombre}, {venta.comuna?.region?.nombre}
          </p>
          <p>Teléfono: {venta.telefono}</p>
        </div>

        <div>
          <h3 className="font-semibold">Método de Envío</h3>
          <p>
            {venta.metodoEnvio?.nombre} - $
            {venta.metodoEnvio?.costo?.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
