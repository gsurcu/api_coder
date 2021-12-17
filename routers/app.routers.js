const express = require('express');
const rutasUsuarios = require('./usuarios/usuarios.routes');
const rutasProductos = require('./productos/productos.routes');

const  router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Rutas
router.use('/usuarios', rutasUsuarios);
router.use('/productos', rutasProductos)

module.exports = router;