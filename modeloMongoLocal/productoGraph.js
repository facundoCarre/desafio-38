
var { buildSchema } = require('graphql');

var schema = buildSchema(`
    type Query {
        buscar: [Producto],
    },
    type Mutation {
        updateProducto(id: String!, nombre: String!, precio:String, stock: String): Producto,
    },
    type Producto {
        _id: String,
        nombre: String,
        precio: String,
        stock: String
    }    
`);

module.exports = {schema}