export function agregarAlCarrito(idProducto, nombreProducto, precioProducto) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.id === idProducto);

  if (index !== -1) {
    carrito[index].cantidad += 1;
  } else {
    carrito.push({
      id: idProducto,
      nombre: nombreProducto,
      precio: precioProducto,
      cantidad: 1,
    });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarConteoCarrito();
  alert("Producto agregado al carrito");
}

export function actualizarConteoCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const contador = document.getElementById("conteo-carrito");
  if (contador) contador.textContent = total;
}
