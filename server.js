const express = require('express');
//const instacncia = new productos();
// creo una app de tipo express
const app = express();
const dotenv = require('dotenv');
dotenv.config();
//const productosRouter = express.Router();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
//require('./database/coneccionMongo');
require('./database/coneccionMongoAtlas');

const productosRouter = require('./routes/producto');
const carritoRouter = require('./routes/carrito');
const usuarioRouter = require('./routes/usuarios');
app.use('/api', productosRouter);
app.use('/api', carritoRouter);
app.use('/api', usuarioRouter);
// pongo a escuchar el servidor en el puerto indicado
const puerto = process.env.PORT || 8080;
const server = app.listen(puerto, () => {
    console.log(`servidor escuchando en http://localhost:${puerto}`);
});

// en caso de error, avisar
server.on('error', error => {
    console.log('error en el servidor:', error);
});