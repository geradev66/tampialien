import express from "express";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
import conectarDB from "./config/conexionDB.js";
import productoRoutes from "./routes/productoRoutes.js";
import routes from './routes/index.js';


// Configuración de CORS
app.use(cors());

routes(app);


const db = await conectarDB();

db.on('error', (error) => {
    console.error('Error de conexión a la base de datos:', error);
});

db.once('open', () => {
    console.log('Conexión a la base de datos establecida 👽');
});

export default app