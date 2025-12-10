import axios from "axios";

const BASE_URL = "https://takicardix.onrender.com/api/regiones";

class RegionService {
  async getAllRegiones() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener las regiones:", error);
      throw error;
    }
  }

  async getRegionById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener la región:", error);
      throw error;
    }
  }
}

export default new RegionService();
