import axios from 'axios';

const BASE_URL = 'https://takicardix.onrender.com/api/productos';

class ProductoService {

    async getAllProductos() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los productos:', error);
            throw error;
        }
    }

    async createProducto(productoData) {
        try {
            const response = await axios.post(BASE_URL, productoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el producto:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateProducto(id, productoData) {
        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, productoData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            throw error;
        }
    }

    async deleteProducto(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
            throw error;
        }
    }

    async getProductoByNombre(nombre) {
        try {
            const response = await axios.get(`${BASE_URL}/nombre/${nombre}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener producto por nombre:', error.response?.data || error.message);
            throw error;
        }
    }

    async getProductoByPrecio(precio) {
        try {
            const response = await axios.get(`${BASE_URL}/precio/${precio}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener producto por precio:', error.response?.data || error.message);
            throw error;
        }
    }

    async getProductoById(id) {
    try {
        const response = await axios.get(`${BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener producto por ID:', error.response?.data || error.message);
        throw error;
    }
}


    async deleteByMarcaId(marcaId) {
        try {
            await axios.delete(`${BASE_URL}/marca/${marcaId}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar productos por marca:', error.response?.data || error.message);
            throw error;
        }
    }   
    



}

export default new ProductoService();
