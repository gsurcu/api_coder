const express = require('express');
const morgan = require('morgan')
const rutasProductos = require('./productos/productos.routes');

const  router = express.Router();

// Middlewares
router.use(morgan('tiny'))
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rutas
router.use('/productos', rutasProductos)

module.exports = router;