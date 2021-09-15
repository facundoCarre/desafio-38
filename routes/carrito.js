const express = require('express');
const router = express.Router();
const carrito = require('../api/carrito');
const {transporter , mailOptions} = require('../config/mail')
router.get('/carrito/listar', permisoCarrito, async (req, res) => {
    let resultado = await carrito.buscar()
    res.json(resultado);
});

router.get('/carrito/listar/:id', permisoCarrito, async (req, res) => {
    let { id } = req.params
    let resultado = await carrito.buscarPorId(id)
    res.json(resultado);
});

router.post('/carrito/agregar',permisoCarrito, (req, res) => {
    res.json(carrito.guardar(req.body));
});

router.delete('/carrito/borrar/:id',permisoCarrito, (req, res) => {
    try {
        let { id } = req.params
        carrito.eliminar(id,req.query.idProductoBorrar)
        res.json('Producto de carrito eliminado con exito ');
    } catch (error) {
        res.json('el prodcuto no se pudo eliminar ');    }

});

router.post('/carrito/finalizar/:idCarrito',permisoCarrito, (req, res) => {
    let { idCarrito } = req.params
    res.json(carrito.finalizarCompra(idCarrito));
});

router.put('/carrito/actualizar/:id', permisoCarrito , async (req, res) => {
    let { id } = req.params
    let producto = req.body
    const carritoActuializado = await carrito.update(id,producto)
    res.json(carritoActuializado);
});
function permisoCarrito (req,res,next){
    let body = req.body;
    const url = req.originalUrl
    const metodo = req.method
    if(body.permisos.administrador && body.permisos.usuario){
       next()
    }else{
        res.status(500).send({error: '-1', descripcion: `ruta ${url} método ${metodo} no autorizada`})
    }
   }

module.exports = router;