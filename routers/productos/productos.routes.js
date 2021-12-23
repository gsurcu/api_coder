const { addProducto } = require('../../api/productos');
const express = require('express');
const {productos} = require('../../data/data')

const router = express.Router();
// /api/productos -> /

router.get('/', (req, res) => {
  const { precioMaximo, search } = req.query;
  let respuestaProductos = [...productos];
  if (Object.keys(req.query).length > 0) {
    if (precioMaximo) {
      if (isNaN(+precioMaximo)) {
        return res.status(400).send('precioMaximo debe ser un número válido');
      }
      respuestaProductos = respuestaProductos.filter(producto => producto.precio <= +precioMaximo);
    }
    if (search) {
      respuestaProductos = respuestaProductos.filter(producto => producto.nombre.toLowerCase().startsWith(search.toLowerCase()))
    }
    return res.json(respuestaProductos);
  }
  console.log(res)
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
  const producto = addProducto(req.body)
  if (producto){
    return res.status(201).json(producto);
  }
  return res.status(404).json({error:'una mensaje'})
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