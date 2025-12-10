import axios from "axios";

const BASE_URL = "https://takicardix.onrender.com/api/marcas";

class MarcaService {
  async getAllMarcas() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las marcas:", error);
      throw error;
    }
  }

  async createMarca(marcaData) {
    try {
      const response = await axios.post(BASE_URL, marcaData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error al crear la marca:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async updateMarca(id, marcaData) {
    try {
      const response = await axios.patch(`${BASE_URL}/${id}`, marcaData);
      return response.data;
    } catch (error) {
      console.error("Error al actualizar la marca:", error);
      throw error;
    }
  }

  async deleteMarca(id) {
    try {
      await axios.delete(`${BASE_URL}/${id}`);
      return true;
    } catch (error) {
      console.error("Error al eliminar la marca:", error);
      throw error;
    }
  }
}

export default new MarcaService();
