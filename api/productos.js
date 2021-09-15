const Productos = require('../modeloMongoLocal/productos');

class ProductosController {

    constructor() { }

    async guardar(productos) {
        try {
           return await Productos.create(productos);
        } catch (error) {
            throw error;
        }
    }

    async buscar(id) {
        try {
            return await Productos.find({});
        } catch (error) {
            throw error;
        }
    }
    async buscarPorId(id) {
        try {
            return await Productos.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(condicion) {

        try {
            return await Productos.findByIdAndDelete(condicion);
        } catch (error) {
            throw error;
        }
    }
    async update(condicion, producto) {
        try {
           return await Productos.findByIdAndUpdate(condicion, producto);
        } catch (error) {
            throw error;
        }
    }
    profuctoFormateado(params) {
       
        let productoFormat ={
            nombre: params.nombre,
            precio: params.precio,
            stock: params.stock
        } 
        
        return productoFormat
    }
    
}

module.exports = new ProductosController();