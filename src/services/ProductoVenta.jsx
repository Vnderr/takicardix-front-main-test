import axios from 'axios';

const BASE_URL = 'https://takicardix.onrender.com/api/productosVentas';

class ProductoVentaService {

    async getAllProductoVentas() {
        try {
            const response = await axios.get(BASE_URL);
            return response.data;
        } catch (error) {
            console.error('Error al obtener los productos de ventas:', error);
            throw error;
        }
    }

    async getProductoVentaById(id) {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error al obtener el producto venta:', error);
            throw error;
        }
    }

    async createProductoVenta(productoVentaData) {
        try {
            const response = await axios.post(BASE_URL, productoVentaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al crear el producto venta:', error.response?.data || error.message);
            throw error;
        }
    }

    async updateProductoVenta(id, productoVentaData) {
        try {
            const response = await axios.patch(`${BASE_URL}/${id}`, productoVentaData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error al actualizar el producto venta:', error);
            throw error;
        }
    }

    async deleteProductoVenta(id) {
        try {
            await axios.delete(`${BASE_URL}/${id}`);
            return true;
        } catch (error) {
            console.error('Error al eliminar el producto venta:', error);
            throw error;
        }
    }
}

export default new ProductoVentaService();
