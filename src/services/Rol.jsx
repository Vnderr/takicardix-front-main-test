import axios from 'axios';

const BASE_URL = 'https://takicardix.onrender.com/api/roles';

class RolService {

    async getAllRoles() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los roles:', error);
            throw error;
        }
    }

    async getRolById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el rol:', error);
            throw error;
        }
    }

    async createRol(rolData) {
        try {
            const response = await axios.post(BASE_URL, rolData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el rol:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateRol(id, rolData) {
        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, rolData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            throw error;
        }
    }

    async deleteRol(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar el rol:', error);
            throw error;
        }
    }
}

export default new RolService();
