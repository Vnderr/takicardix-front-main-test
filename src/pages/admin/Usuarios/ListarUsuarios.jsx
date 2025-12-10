import { useState, useEffect } from "react";
import UsuarioService from "../../../services/Usuario";
import DynamicTable from "../../../components/molecules/DynamicTable";
import Text from "../../../components/atoms/Text";
import Button from "../../../components/atoms/Button";

function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const usuariosData = await UsuarioService.getAllUsuarios();
        setUsuarios(usuariosData);
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsuarios();
  }, []);

  const columns = [
    { key: "usuario_id", label: "ID" },
    { key: "nombre", label: "Nombre" },
    { key: "correo", label: "Email" },
    {
      key: "rol",
      label: "Rol",
      render: (value) => value?.nombre || "N/A",
    },
    {
      key: "actions",
      label: "Acciones",
      render: (_, row) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.usuario_id)}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
          >
            Editar
          </button>
          <button
            onClick={() => handleDelete(row.usuario_id)}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const handleEdit = (usuarioId) => {
    console.log("Editar usuario:", usuarioId);
    alert("Funcionalidad de edición por implementar");
  };

  const handleDelete = async (usuarioId) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      try {
        await UsuarioService.deleteUsuario(usuarioId);
        const nuevosUsuarios = await UsuarioService.getAllUsuarios();
        setUsuarios(nuevosUsuarios);
      } catch (error) {
        console.error("Error eliminando usuario:", error);
        alert("Error al eliminar usuario");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando usuarios...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Text variant="h1" className="text-2xl font-bold">
            Gestión de Usuarios
          </Text>
          <Text variant="p" className="text-gray-600 mt-2">
            Administra todos los usuarios del sistema
          </Text>
        </div>
        <Button
          onClick={() => navigate("/admin/usuarios/crear")}
          className="bg-green-500 hover:bg-green-600 text-white"
          text="Crear Usuario"
        />
      </div>

      {/* Tabla de usuarios */}
      <DynamicTable
        data={usuarios}
        columns={columns}
        className="bg-white rounded-lg shadow"
      />
    </div>
  );
}

export default ListarUsuarios;
