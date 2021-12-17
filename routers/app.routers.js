const express = require('express');
const morgan = require('morgan')
const rutasUsuarios = require('./usuarios/usuarios.routes');
const rutasProductos = require('./productos/productos.routes');
const rutasArchivo = require('./archivos/archivos.routes')

const  router = express.Router();

// Middlewares
router.use(morgan('tiny'))
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rutas
router.use('/usuarios', rutasUsuarios);
router.use('/productos', rutasProductos)
router.use(rutasArchivo);

module.exports = router;