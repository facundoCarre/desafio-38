const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
    nombre: { type: String},
    direccion: { type: String},
    edad: { type: Number},
    nroTelefono: { type: String},
    foto: { type: String},

});

const Usuarios = mongoose.model('usuario', schema);

module.exports = Usuarios;
