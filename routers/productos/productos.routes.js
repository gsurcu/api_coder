// const { addProducto } = require('../../api/productos');
const express = require('express');
const {productos} = require('../../data/data')

const router = express.Router();
// /api/productos -> /

router.get('/', (req, res) => {
  let respuestaProductos = [...productos];
  return res.json(respuestaProductos);
});

router.get('/:idProducto', (req, res) => {
  const { idProducto } = req.params;
  const producto = productos.find(producto => producto.id === +idProducto);
  if (!producto) {
    return res.status(404).send(`El producto con id: ${req.params.idProducto} no existe`);
  }
  return res.json(producto);
});

router.post('/', (req, res) => {
  const { nombre, descripcion, precio, imagen } = req.body;
  if (!req.body) {
    return res.status(400).send('El cuerpo tiene un formato incorrecto')
  }
  console.log(req.body);
  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    descripcion,
    precio,
    imagen
  };
  productos.push(nuevoProducto);
  return res.json(nuevoProducto);
});

router.put('/:idProducto', (req, res) => {
  const { params: { idProducto }, body: { nombre, descripcion, precio, imagen} } = req;
  const indiceProducto = productos.findIndex((producto) => producto.id === +idProducto);
  if (indiceProducto < 0) return res.status(404).send(`El producto con id ${idProducto} no existe!`);
  const nuevoProducto = {
    ...productos[indiceProducto],
    nombre,
    descripcion,
    precio,
    imagen
  };
  productos[indiceProducto] = nuevoProducto;
  return res.json(nuevoProducto);
});

router.delete('/:idProducto', (req, res) => {
  const { idProducto } = req.params;
  const indiceProducto = productos.findIndex(producto => producto.id === +idProducto);
  if (indiceProducto < 0) return res.status(404).send(`Producto con id ${idProducto} no existe!`);
  productos.splice(indiceProducto, 1);
  return res.send('producto eliminado correctamente!');
});

module.exports = router;