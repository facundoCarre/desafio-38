const Carritos = require('../modeloMongoLocal/carrito');
const {transporter , mailOptions} = require('../config/mail')
const Usuarios = require('../modeloMongoLocal/usuarios');
//const client = require('../config/sms')
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const nroTelefonoDueño = "+5493518002741"
class CarritoController {

    constructor() { }

    async guardar(productos) {
        try {
           return await Carritos.create(productos);
        } catch (error) {
            throw error;
        }
    }
    async finalizarCompra(idCarrito) {
        try { 
            let carrito = await Carritos.findById(idCarrito);
            let usuario = await Usuarios.findById(carrito.usuario);
            mailOptions.text = JSON.stringify(carrito.productos)
            console.log(JSON.stringify(usuario))
            mailOptions.subject =`nuevo pedido de ${usuario.nombre} e email ${usuario.username}` 
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    console.log(err)
                    return err
                }
                console.log(info)
            })
            client.messages.create({
                body: `Te paso la lista de los productos que compraste ${carrito.productos}`,
                from: 'whatsapp:+14155238886',
                to: `whatsapp:${nroTelefonoDueño}`
                })
          .then(message => console.log(message.sid))
          .catch(console.log)   
          
            client.messages.create({
                body: 'Hola su pedido ha sido recibido y se encuentra en proceso',
                from: '+17048692404',
                to: usuario.nroTelefono
            })
            .then(message => console.log(message.sid))
            .catch(console.log)
        } catch (error) {
            throw error;
        }
    }

    async buscar(id) {
        try {
            return await Carritos.find({});
        } catch (error) {
            throw error;
        }
    }
    async buscarPorId(id) {
        try {
            return await Carritos.findById(id);
        } catch (error) {
            throw error;
        }
    }
    async eliminar(id, idProductoBorrar) {
        try {
            let carrito = await Carritos.findById(id)
            return  await Carritos.findByIdAndUpdate(id, {$pull: {"productos": {_id: String(idProductoBorrar)}}})
        } catch (error) {
            throw error;
        }
    }
    async update(id, producto) {
        try {
            let carrito = await Carritos.findById(id)
            producto.productos.forEach(function(prod) {
                carrito.productos.push(prod)
            }); 
            carrito.save();
            return carrito;
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

module.exports = new CarritoController();