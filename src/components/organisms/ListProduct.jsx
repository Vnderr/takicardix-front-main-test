
import React from "react";
import products from "../../data/Products";
import CardBody from '../molecules/CardBody';

const ListaProductos = ({ mostrarTodos = false }) => {
  const limite = mostrarTodos ? products.length : 4;
  const productosMostrados = products.slice(0, limite);

  return (
    <ul className="lista-productos">
      {productosMostrados.map((producto) => (
        <CardBody key={products.id} products={products} />
      ))}
    </ul>
  );
};

export default ListaProductos;
