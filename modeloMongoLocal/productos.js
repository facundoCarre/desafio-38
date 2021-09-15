const mongoose = require('mongoose');

const schema = mongoose.Schema({
    nombre: { type: String, required: true, max: 100 },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
});

const Productos = mongoose.model('producto', schema);

module.exports = Productos;