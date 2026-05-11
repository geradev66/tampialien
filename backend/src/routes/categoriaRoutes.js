import express from 'express';
import categoriaController from '../controllers/categoriaController.js';
import auth from "../middlewares/auth.js";

const routes = express.Router();

// Rutas para categorías
routes.get("/", categoriaController.listaDeCategorias);
routes.get("/:id", categoriaController.listaCategoriaPorId);
routes.post("/", auth, categoriaController.crearCategoria);
routes.put("/:id", auth, categoriaController.actualizacionCategoria);
routes.delete("/:id", auth, categoriaController.eliminarCategoria);

export default routes;