import express from 'express';
import productoRoutes from './productoRoutes.js';
import cartRoutes from './cartRoutes.js';
import authRoutes from './authRoutes.js';
import checkoutRoutes from "./checkoutRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";

const router = express.Router();
// Rutas para productos
const routes = (app) => {
    app.get('/', (req, res) => {
        res.status(200).send('Bienvenido a la API de TampiAlien 👽');
    });
    app.use(express.json());
    app.use(productoRoutes);
    app.use('/cart', cartRoutes);
    app.use("/auth", authRoutes);
    app.use("/checkout", checkoutRoutes);
    app.use("/categorias", categoriaRoutes);

};
export default routes;