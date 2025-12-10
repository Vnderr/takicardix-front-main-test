import axios from "axios";


const BASE_URL = "https://takicardix.onrender.com/api/metodosPago";
class MetodoPagoService {
  async getAllMetodosPago() {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los métodos de pago:", error);
      throw error;
    }
  }

  async getMetodoPagoById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el método de pago:", error);
      throw error;
    }
  }
}

export default new MetodoPagoService();
