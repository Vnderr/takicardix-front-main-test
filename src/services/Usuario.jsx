import axios from "axios";

const BASE_URL = "https://takicardix.onrender.com/api/usuarios";

class UsuarioService {
  async getAllUsuarios() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
      throw error;
    }
  }

  async getUsuarioById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }

  async createUsuario(usuarioData) {
    try {
      const response = await axios.post(BASE_URL, usuarioData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al crear el usuario:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async updateUsuario(id, usuarioData) {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, usuarioData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }

  async deleteUsuario(id) {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }

  async getUsuarioByCorreo(correo) {
    try {
      const response = await axios.get(`${BASE_URL}/correo/${correo}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error al obtener usuario por correo:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async login(credentials) {
    try {
      console.log("📡 Enviando login a API...", credentials);
      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          correo: credentials.correo,
          contrasena: credentials.contrasena,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("📡 Respuesta de API:", response.data);

      // Adaptar la respuesta al formato que espera AuthContext
      const { token, usuario } = response.data;

      return { userData: usuario, token };
    } catch (error) {
      console.error(
        "❌ Error en servicio login:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

export default new UsuarioService();
