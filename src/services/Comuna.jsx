import axios from "axios";

const BASE_URL = "https://takicardix.onrender.com/api/comunas";

class ComunaService {
  async getAllComunas() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las comunas:", error);
      throw error;
    }
  }

  async getComunaById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la comuna:", error);
      throw error;
    }
  }


  async getComunasByRegion(regionId) {
    try {
      const allComunas = await this.getAllComunas();
      return allComunas.filter(
        (comuna) => comuna.region?.region_id === regionId
      );
    } catch (error) {
      console.error("Error al obtener comunas por región:", error);
      throw error;
    }
  }
}

export default new ComunaService();
