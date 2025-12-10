import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CardsDisplay from "../../components/organisms/CardsDisplay";
import { agregarAlCarrito } from "../../data/Cart";
import Producto from "../../services/Producto"; 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    Producto.getProductoById(id)
      .then((data) => setProduct(data))
      .catch((err) => console.error("Error al cargar producto:", err));
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto my-10 px-6">
        <h1 className="text-2xl font-bold text-center text-red-600">
          Producto no encontrado
        </h1>
      </div>
    );
  }

  const content = [
    {
      card: [
        { type: "image", src: product.imageUrl, alt: product.nombre, className: "w-full max-w-md rounded-lg shadow-md" },
        { type: "text", variant: "h2", text: product.nombre },
        { type: "text", variant: "p", text: product.descripcion },
        { type: "text", variant: "h4", text: `$${product.precio}` },
        {
          type: "button",
          text: "Agregar al carrito",
          onClick: () =>
            agregarAlCarrito(product.producto_id, product.nombre, product.precio),
          className:
            "mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition",
        },
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto my-10 flex justify-center px-6">
      <CardsDisplay content={content} isCardList={true} />
    </div>
  );
}

export default ProductDetail;
