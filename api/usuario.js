const Usuarios = require('../modeloMongoLocal/usuarios');
const bcrypt = require('bcrypt');

const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

class CarritoController {

    constructor() { }

    async signup(usuario) {
        console.log('datos del usuario ' + JSON.stringify(usuario))
        try {
           /* const usuario ={
                username: username,
                password: this.createHash(password)
            }*/
         return  await Usuarios.create(usuario) ;
        } catch (error) {
            throw error;
        }
    }

    async buscar(email) {
        try {
            return await Usuarios.findOne({ username: email}).exec();
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
    createHash = (password) => {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
    }
    
}

module.exports = new CarritoController();