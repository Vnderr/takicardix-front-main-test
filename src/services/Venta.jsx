import axios from "axios";

const BASE_URL = "https://takicardix.onrender.com/api/ventas";

class VentaService {
  async getAllVentas() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las ventas:", error);
      throw error;
    }
  }

  async getVentaById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la venta:", error);
      throw error;
    }
  }

  async createVenta(ventaData) {
    try {
      const response = await axios.post(BASE_URL, ventaData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al crear la venta:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async updateVenta(id, ventaData) {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, ventaData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
      throw error;
    }
  }

  async deleteVenta(id) {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
      throw error;
    }
  }
async getVentasByUsuario(usuarioId, token) {
  try {
    const response = await axios.get(`${BASE_URL}/usuario/${usuarioId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las ventas del usuario:", error.response?.data || error.message);
    throw error;
  }
}
}

export default new VentaService();
