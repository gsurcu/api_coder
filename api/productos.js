const {productos} = require('../data/data')
const addProducto = ({ nombre, descripcion, precio, imagen })=>{
  if ( !nombre || !descripcion || !precio || !imagen) {
    return res.status(400).send('El cuerpo tiene un formato incorrecto')
  }
  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    descripcion,
    precio,
    imagen
  };
  productos.push(nuevoProducto);
}