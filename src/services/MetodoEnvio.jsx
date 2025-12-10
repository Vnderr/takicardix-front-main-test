import axios from "axios";


const BASE_URL = "https://takicardix.onrender.com/api/metodosEnvios";
class MetodoEnvioService {
    async getAllMetodosEnvios() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error("Error al obtener los métodos de envío:", error);
            throw error;
        }
    }

    async createMetodoEnvio(metodoEnvioData) {
        try {
            const response = await axios.post(BASE_URL, metodoEnvioData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error(
                "Error al crear el metodo de envio:",
                error.response?.data || error.message
            );
            throw error;
        }
    }

    async updateMetodoEnvio(id, metodoEnvioData) {
        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, metodoEnvioData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error al actualizar el metodo de envio::", error);
            throw error;
        }
    }

    async deleteMetodoEnvio(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error("Error al eliminar el metodo de envio::", error);
            throw error;
        }
    }
}

export default new MetodoEnvioService();
