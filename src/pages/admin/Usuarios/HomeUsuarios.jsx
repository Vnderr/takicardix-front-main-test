import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioService from "../../../services/Usuario";
import Text from "../../../components/atoms/Text";
import Button from "../../../components/atoms/Button";

function HomeUsuarios() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    usuariosActivos: 0,
    administradores: 0,
    clientes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const usuarios = await UsuarioService.getAllUsuarios();

        const administradores = usuarios.filter(
          (user) => user.rol?.nombre === "Admin" || user.rol?.rol_id === 1
        );

        const clientes = usuarios.filter(
          (user) => user.rol?.nombre === "Cliente" || user.rol?.rol_id === 2
        );

        setStats({
          totalUsuarios: usuarios.length,
          usuariosActivos: usuarios.length, 
          administradores: administradores.length,
          clientes: clientes.length,
        });
      } catch (error) {
        console.error("Error cargando estadísticas de usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Text variant="p">Cargando estadísticas de usuarios...</Text>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <Text variant="h1" className="text-3xl font-bold text-gray-900">
          Gestión de Usuarios
        </Text>
        <Text variant="p" className="text-gray-600 mt-2">
          Administra los usuarios y permisos del sistema
        </Text>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Total de Usuarios
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-blue-600">
            {stats.totalUsuarios}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Usuarios registrados
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Usuarios Activos
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-green-600">
            {stats.usuariosActivos}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Cuentas activas
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Administradores
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-purple-600">
            {stats.administradores}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Usuarios con permisos
          </Text>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md border">
          <Text
            variant="h3"
            className="text-lg font-semibold text-gray-700 mb-2"
          >
            Clientes
          </Text>
          <Text variant="h2" className="text-3xl font-bold text-orange-600">
            {stats.clientes}
          </Text>
          <Text variant="p" className="text-gray-500 text-sm mt-1">
            Usuarios regulares
          </Text>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="bg-white p-6 rounded-lg shadow-md border mb-8">
        <Text variant="h2" className="text-xl font-semibold mb-4">
          Acciones Rápidas
        </Text>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate("/admin/usuarios/listar")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-3"
            text="Ver Todos los Usuarios"
          />

          <Button
            onClick={() => navigate("/admin/usuarios")}
            className="bg-green-500 hover:bg-green-600 text-white py-3"
            text="Crear Nuevo Usuario"
          />

          <Button
            onClick={() => navigate("/admin/usuarios")}
            className="bg-purple-500 hover:bg-purple-600 text-white py-3"
            text="Gestionar Permisos"
          />
        </div>
      </div>

      {/* Información Adicional */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Resumen de Usuarios
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Nuevos usuarios este mes: 0
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Usuarios con compras: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            Usuarios inactivos: Por implementar
          </Text>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg border">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Acciones Pendientes
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Revisar usuarios nuevos: 0
          </Text>
          <Text variant="p" className="text-gray-600 mb-2">
            Actualizar permisos: Por implementar
          </Text>
          <Text variant="p" className="text-gray-600">
            Verificar actividad: Por implementar
          </Text>
        </div>
      </div>
    </div>
  );
}

export default HomeUsuarios;
