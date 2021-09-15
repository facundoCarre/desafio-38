const mongoose = require('mongoose');

const schema = mongoose.Schema({
    productos: [
               { 
                 nombreProducto: { type: String, required: true, max: 100 },
                 precio: { type: Number, required: true },
                 stock: { type: Number, required: true }, 
                }
              ],
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'usuario'},
});

const Carritos = mongoose.model('carrito', schema);

module.exports = Carritos;