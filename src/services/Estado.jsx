import axios from 'axios';

const BASE_URL = 'https://takicardix.onrender.com/api/estados';

class EstadoService {

    async getAllEstados() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los estados:', error);
            throw error;
        }
    }

    async createEstado(estadoData) {
        try {
            const response = await axios.post(BASE_URL, estadoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el estado:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateComuna(id, estadoData) {
        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, estadoData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el estado:', error);
            throw error;
        }
    }

    async deleteComuna(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar el estado:', error);
            throw error;
        }
    }
}

export default new ComunaService();
