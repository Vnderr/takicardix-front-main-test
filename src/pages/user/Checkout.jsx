import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import VentaService from "../../services/Venta";
import RegionService from "../../services/Region";
import ComunaService from "../../services/Comuna";
import MetodoPagoService from "../../services/MetodoPago";
import MetodoEnvioService from "../../services/MetodoEnvio";

function Checkout() {
  const { cart, getCartTotal, clearCart, user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [regiones, setRegiones] = useState([]);
  const [comunas, setComunas] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);
  const [metodosEnvio, setMetodosEnvio] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [shippingInfo, setShippingInfo] = useState({
    direccion: "",
    comuna_id: "",
    region_id: "",
    telefono: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingMethod, setShippingMethod] = useState("");


  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [regionesData, metodosPagoData, metodosEnvioData] =
          await Promise.all([
            RegionService.getAllRegiones(),
            MetodoPagoService.getAllMetodosPago(),
            MetodoEnvioService.getAllMetodosEnvios(),
          ]);

        setRegiones(regionesData);
        setMetodosPago(metodosPagoData);
        setMetodosEnvio(metodosEnvioData);

        if (metodosEnvioData.length > 0) {
          setShippingMethod(metodosEnvioData[0].metodo_envio_id.toString());
        }

        if (metodosPagoData.length > 0) {
          setPaymentMethod(metodosPagoData[0].metodo_pago_id.toString());
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    const loadComunas = async () => {
      if (shippingInfo.region_id) {
        try {
          const comunasData = await ComunaService.getComunasByRegion(
            parseInt(shippingInfo.region_id)
          );
          setComunas(comunasData);
          setShippingInfo((prev) => ({ ...prev, comuna_id: "" })); 
        } catch (error) {
          console.error("Error loading comunas:", error);
          setComunas([]);
        }
      } else {
        setComunas([]);
      }
    };

    loadComunas();
  }, [shippingInfo.region_id]);

  const getTotalWithShipping = () => {
    const subtotal = getCartTotal();
    const selectedShipping = metodosEnvio.find(
      (envio) => envio.metodo_envio_id.toString() === shippingMethod
    );
    const shippingCost = selectedShipping ? selectedShipping.costo : 0;
    return subtotal + shippingCost;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const ventaData = {
        monto: getTotalWithShipping(),
        detalle: `Pedido de ${cart.length} productos`,
        fecha_venta: new Date().toISOString().split("T")[0],
        total: cart.reduce((total, item) => total + item.cantidad, 0),
        usuario: { usuario_id: user.usuario_id },
        metodoPago: { metodo_pago_id: parseInt(paymentMethod) },
        metodoEnvio: { metodo_envio_id: parseInt(shippingMethod) },
        estado: { estado_id: 1 },
        direccion: shippingInfo.direccion,
        comuna: { comuna_id: parseInt(shippingInfo.comuna_id) },
        telefono: shippingInfo.telefono,
      };

      const nuevaVenta = await VentaService.createVenta(ventaData);
      clearCart();
      navigate(`/order/${nuevaVenta.venta_id}`);
    } catch (error) {
      console.error("Error al crear pedido:", error);
      alert("Error al procesar el pedido. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h1>
          <p className="text-gray-600 mb-6">Tu carrito está vacío</p>
          <button
            onClick={() => navigate("/products")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Ir a Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario de Envío y Pago */}
          <div>
            <form onSubmit={handleSubmit}>
              {/* Información de Envío */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Información de Envío
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.direccion}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          direccion: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      placeholder="Calle y número"
                    />
                  </div>

                  {/*  SELECT DE REGIÓN */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Región
                    </label>
                    <select
                      value={shippingInfo.region_id}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          region_id: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                    >
                      <option value="">Selecciona una región</option>
                      {regiones.map((region) => (
                        <option key={region.region_id} value={region.region_id}>
                          {region.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/*  SELECT DE COMUNA (DEPENDE DE REGIÓN) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Comuna
                    </label>
                    <select
                      value={shippingInfo.comuna_id}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          comuna_id: e.target.value,
                        })
                      }
                      required
                      disabled={!shippingInfo.region_id || comunas.length === 0}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                    >
                      <option value="">
                        {!shippingInfo.region_id
                          ? "Primero selecciona una región"
                          : comunas.length === 0
                          ? "Cargando comunas..."
                          : "Selecciona una comuna"}
                      </option>
                      {comunas.map((comuna) => (
                        <option key={comuna.comuna_id} value={comuna.comuna_id}>
                          {comuna.nombre}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.telefono}
                      onChange={(e) =>
                        setShippingInfo({
                          ...shippingInfo,
                          telefono: e.target.value,
                        })
                      }
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
                      placeholder=" 9 1234 5678"
                    />
                  </div>
                </div>
              </div>

              {/*  MÉTODOS DE ENVÍO DESDE API */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Método de Envío
                </h2>

                <div className="space-y-3">
                  {metodosEnvio.map((metodo) => (
                    <label
                      key={metodo.metodo_envio_id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          value={metodo.metodo_envio_id}
                          checked={
                            shippingMethod === metodo.metodo_envio_id.toString()
                          }
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="mr-3 h-5 w-5 text-blue-600"
                        />
                        <span className="font-medium text-gray-900">
                          {metodo.nombre}
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {metodo.costo === 0
                          ? "Gratis"
                          : `$${metodo.costo.toLocaleString()}`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/*  MÉTODOS DE PAGO DESDE API */}
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Método de Pago
                </h2>

                <div className="space-y-3">
                  {metodosPago.map((metodo) => (
                    <label
                      key={metodo.metodo_pago_id}
                      className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        value={metodo.metodo_pago_id}
                        checked={
                          paymentMethod === metodo.metodo_pago_id.toString()
                        }
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mr-3 h-5 w-5 text-blue-600"
                      />
                      <span className="font-medium">{metodo.nombre}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors ${
                  loading
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-black"
                }`}
              >
                {loading ? "Procesando..." : "Confirmar Pedido"}
              </button>
            </form>
          </div>

          {/* Resumen del Pedido */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 h-fit">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Resumen del Pedido
            </h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div
                  key={item.producto_id}
                  className="flex justify-between items-center pb-4 border-b border-gray-200"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.nombre}</p>
                    <p className="text-sm text-gray-600">
                      {item.cantidad} x ${item.precio?.toLocaleString()}
                    </p>
                  </div>
                  <p className="font-semibold text-gray-900">
                    ${(item.precio * item.cantidad)?.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Subtotal:</p>
                <p className="text-gray-900">
                  ${getCartTotal()?.toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-600">Envío:</p>
                <p className="text-gray-900">
                  {(() => {
                    const selectedShipping = metodosEnvio.find(
                      (envio) =>
                        envio.metodo_envio_id.toString() === shippingMethod
                    );
                    return selectedShipping && selectedShipping.costo > 0
                      ? `$${selectedShipping.costo.toLocaleString()}`
                      : "Gratis";
                  })()}
                </p>
              </div>
              <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t border-gray-200">
                <p className="text-gray-900">Total:</p>
                <p className="text-green-600">
                  ${getTotalWithShipping()?.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
