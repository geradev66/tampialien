import express from 'express';
import productosController from '../controllers/productosController.js';
import auth from '../middlewares/auth.js';

const routes = express.Router();

// Ruta para obtener todos los productos
routes.get('/productos', productosController.listaDeProductos);
// Ruta para obtener un producto por su ID
routes.get('/productos/:id', productosController.listaProductoPorId);
// Ruta para crear un nuevo producto
routes.post('/productos', auth, productosController.crearProducto);
// Ruta para actualizar un producto por su ID
routes.put('/productos/:id', auth, productosController.actualizacionProducto);
// Ruta para eliminar un producto por su ID
routes.delete('/productos/:id', auth, productosController.eliminarProducto);

export default routes;
