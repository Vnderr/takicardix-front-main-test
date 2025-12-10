import axios from 'axios';

const BASE_URL = 'https://takicardix.onrender.com/api/direcciones';

class DireccionService {

    async getAllDirecciones() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener las Direcciones:', error);
            throw error;
        }
    }

    async createDireccion(direccionData) {
        try {
            const response = await axios.post(BASE_URL, direccionData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear la direccion:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateComuna(id, direccionData) {
        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, direccionData);
            return response.data;
        } catch (error) {
            console.error('Error al actualizar la direccion:', error);
            throw error;
        }
    }

    async deleteComuna(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar la direccion:', error);
            throw error;
        }
    }
}

export default new DireccionService();
