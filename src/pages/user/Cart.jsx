import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Cart() {
  const [carrito, setCarrito] = useState([]);
  const { cart, removeFromCart, updateCartQuantity, getCartTotal, clearCart } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCarrito(cart);
  }, [cart]);

  const handleQuantityChange = (producto_id, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(producto_id, newQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tu Carrito</h1>

        {carrito.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">El carrito está vacío.</p>
            <button
              onClick={() => navigate("/products")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Ir a Productos
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Producto</th>
                    <th className="px-6 py-4 text-left">Precio</th>
                    <th className="px-6 py-4 text-left">Cantidad</th>
                    <th className="px-6 py-4 text-left">Subtotal</th>
                    <th className="px-6 py-4 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr
                      key={item.producto_id}
                      className="border-t border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={item.imageUrl}
                            alt={item.nombre}
                            className="w-12 h-12 object-cover rounded mr-4"
                          />
                          <span className="font-medium">{item.nombre}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        ${item.precio?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.producto_id,
                                item.cantidad - 1
                              )
                            }
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          >
                            -
                          </button>
                          <span className="mx-2 font-medium">
                            {item.cantidad}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(
                                item.producto_id,
                                item.cantidad + 1
                              )
                            }
                            className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-green-600 font-bold">
                        ${(item.precio * item.cantidad)?.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => removeFromCart(item.producto_id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Vaciar Carrito
              </button>

              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  Total: ${getCartTotal()?.toLocaleString()}
                </div>
                <button
                  onClick={() => navigate("/checkout")}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-colors"
                >
                  Proceder al Pago
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
