import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import ProductoService from "../../../services/Producto";
import MarcaService from "../../../services/Marca";
import DynamicTable from "../../../components/molecules/DynamicTable";
import CreateModal from "../../../components/organisms/CreateModal";
import DynamicInput from "../../../components/molecules/DynamicInput";
import Button from "../../../components/atoms/Button";
import Text from "../../../components/atoms/Text";

function ListarProductos() {
  const { user } = useAuth();
  const [productos, setProductos] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosData, marcasData] = await Promise.all([
          ProductoService.getAllProductos(),
          MarcaService.getAllMarcas(),
        ]);
        setProductos(productosData);
        setMarcas(marcasData);
      } catch (error) {
        console.error("Error cargando datos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    { key: "producto_id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    {
      key: "precio",
      label: "Precio",
      render: (value) => `$${value?.toLocaleString()}`,
    },
    {
      key: "marca",
      label: "Marca",
      render: (value) => value?.nombre || "Sin marca",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => setEditingProduct(row)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.producto_id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  // Campos del formulario
  const formFields = [
    {
      name: "nombre",
      label: "Nombre",
      type: "text",
      required: true,
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      required: true,
    },
    {
      name: "precio",
      label: "Precio",
      type: "number",
      required: true,
    },
    {
      name: "imageUrl",
      label: "URL de Imagen",
      type: "text",
      required: true,
    },
    {
      name: "marca",
      label: "Marca",
      type: "select",
      options: marcas.map((marca) => ({
        value: marca.marca_id,
        label: marca.nombre,
      })),
      required: true,
    },
  ];

  // Handlers
  const handleCreate = async (formData) => {
    try {
      const productoData = {
        ...formData,
        marca: { marca_id: parseInt(formData.marca) },
      };
      await ProductoService.createProducto(productoData);
      setShowCreateModal(false);
      // Recargar productos
      const nuevosProductos = await ProductoService.getAllProductos();
      setProductos(nuevosProductos);
    } catch (error) {
      console.error("Error creando producto:", error);
      alert("Error al crear producto");
    }
  };

  const handleEdit = async (formData) => {
    try {
      const productoData = {
        ...formData,
        marca: { marca_id: parseInt(formData.marca) },
      };
      await ProductoService.updateProducto(
        editingProduct.producto_id,
        productoData
      );
      setEditingProduct(null);
      // Recargar productos
      const nuevosProductos = await ProductoService.getAllProductos();
      setProductos(nuevosProductos);
    } catch (error) {
      console.error("Error editando producto:", error);
      alert("Error al editar producto");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      try {
        await ProductoService.deleteProducto(id);
        // Recargar productos
        const nuevosProductos = await ProductoService.getAllProductos();
        setProductos(nuevosProductos);
      } catch (error) {
        console.error("Error eliminando producto:", error);
        alert("Error al eliminar producto");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando productos...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Text variant="h1" className="text-2xl font-bold">
          Gestión de Productos
        </Text>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
          text="Crear Producto"
        />
      </div>

      {/* Tabla de productos */}
      <DynamicTable
        data={productos}
        columns={columns}
        className="bg-white rounded-lg shadow"
      />

      {/* Modal Crear */}
      {showCreateModal && (
        <CreateModal
          title="Crear Producto"
          fields={formFields}
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Modal Editar */}
      {editingProduct && (
        <CreateModal
          title="Editar Producto"
          fields={formFields}
          initialData={{
            ...editingProduct,
            marca: editingProduct.marca?.marca_id?.toString(),
          }}
          onSubmit={handleEdit}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </div>
  );
}

export default ListarProductos;
