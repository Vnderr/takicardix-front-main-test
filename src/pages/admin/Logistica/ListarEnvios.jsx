import { useState, useEffect } from "react";
import MetodoEnvioService from "../../../services/MetodoEnvio";
import DynamicTable from "../../../components/molecules/DynamicTable";
import CreateModal from "../../../components/organisms/CreateModal";
import Button from "../../../components/atoms/Button";
import Text from "../../../components/atoms/Text";

function ListarEnvios() {
  const [metodosEnvio, setMetodosEnvio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingEnvio, setEditingEnvio] = useState(null);

  useEffect(() => {
    const loadMetodosEnvio = async () => {
      try {
        const metodosData = await MetodoEnvioService.getAllMetodosEnvios();
        setMetodosEnvio(metodosData);
      } catch (error) {
        console.error("Error cargando métodos de envío:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetodosEnvio();
  }, []);

  // Columnas para la tabla
  const columns = [
    { key: "metodo_envio_id", label: "ID" },
    { key: "nombre", label: "Método de Envío" },
    {
      key: "costo",
      label: "Costo",
      render: (value) =>
        value === 0 ? "Gratis" : `$${value?.toLocaleString()}`,
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => setEditingEnvio(row)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.metodo_envio_id)}
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
      label: "Nombre del Método",
      type: "text",
      required: true,
      placeholder: "Ej: Despacho a domicilio, Retiro en tienda",
    },
    {
      name: "costo",
      label: "Costo de Envío",
      type: "number",
      required: true,
      placeholder: "0 para envío gratis",
    },
    {
      name: "descripcion",
      label: "Descripción",
      type: "textarea",
      required: false,
      placeholder: "Descripción del método de envío",
    },
  ];

  // Handlers
  const handleCreate = async (formData) => {
    try {
      await MetodoEnvioService.createMetodoEnvio(formData);
      setShowCreateModal(false);
      // Recargar métodos de envío
      const nuevosMetodos = await MetodoEnvioService.getAllMetodosEnvios();
      setMetodosEnvio(nuevosMetodos);
    } catch (error) {
      console.error("Error creando método de envío:", error);
      alert("Error al crear método de envío");
    }
  };

  const handleEdit = async (formData) => {
    try {
      await MetodoEnvioService.updateMetodoEnvio(
        editingEnvio.metodo_envio_id,
        formData
      );
      setEditingEnvio(null);
      // Recargar métodos de envío
      const nuevosMetodos = await MetodoEnvioService.getAllMetodosEnvios();
      setMetodosEnvio(nuevosMetodos);
    } catch (error) {
      console.error("Error editando método de envío:", error);
      alert("Error al editar método de envío");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este método de envío?")) {
      try {
        await MetodoEnvioService.deleteMetodoEnvio(id);
        // Recargar métodos de envío
        const nuevosMetodos = await MetodoEnvioService.getAllMetodosEnvios();
        setMetodosEnvio(nuevosMetodos);
      } catch (error) {
        console.error("Error eliminando método de envío:", error);
        alert("Error al eliminar método de envío");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando métodos de envío...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Text variant="h1" className="text-2xl font-bold">
            Gestión de Métodos de Envío
          </Text>
          <Text variant="p" className="text-gray-600 mt-2">
            Administra los métodos de envío disponibles
          </Text>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
          text="Crear Método de Envío"
        />
      </div>

      {/* Tabla de métodos de envío */}
      <DynamicTable
        data={metodosEnvio}
        columns={columns}
        className="bg-white rounded-lg shadow"
      />

      {/* Modal Crear */}
      {showCreateModal && (
        <CreateModal
          title="Crear Método de Envío"
          fields={formFields}
          onSubmit={handleCreate}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {/* Modal Editar */}
      {editingEnvio && (
        <CreateModal
          title="Editar Método de Envío"
          fields={formFields}
          initialData={editingEnvio}
          onSubmit={handleEdit}
          onClose={() => setEditingEnvio(null)}
        />
      )}
    </div>
  );
}

export default ListarEnvios;
