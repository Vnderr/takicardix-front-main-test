import { useAuth } from "../../context/AuthContext";
import Text from "../../components/atoms/Text";
import Button from "../../components/atoms/Button";

function Profile() {
  const { user, logout } = useAuth();

  if (!user) {
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <Text type="h1" className="text-3xl font-bold mb-6">
        Mi Perfil
      </Text>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <Text type="h2" className="text-xl font-semibold mb-4">
            Información Personal
          </Text>
          <div className="space-y-3">
            <div>
              <Text type="p" className="text-gray-600 text-sm">
                Nombre:
              </Text>
              <Text type="p" className="font-medium">
                {user.nombre}
              </Text>
            </div>
            <div>
              <Text type="p" className="text-gray-600 text-sm">
                Email:
              </Text>
              <Text type="p" className="font-medium">
                {user.correo}
              </Text>
            </div>
            <div>
              <Text type="p" className="text-gray-600 text-sm">
                Rol:
              </Text>
              <Text type="p" className="font-medium">
                {user.rol?.nombre || "Usuario"}
              </Text>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <Text type="h2" className="text-xl font-semibold mb-4">
            Acciones
          </Text>
          <div className="space-y-3">
            <Button
              onClick={() => (window.location.href = "/orders")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
              text="Mis Pedidos"
            />

            {(user.rol?.rol_id === 1 || user.rol?.nombre === "Admin") && (
              <Button
                onClick={() => (window.location.href = "/admin/dashboard")}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2"
                text="Panel de Admin"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
