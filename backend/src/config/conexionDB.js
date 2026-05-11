import mongoose from "mongoose";

async function conectarDB() {
    const uri = process.env.MONGO_URL || process.env.DB_CONECTION_STRING;
    
    if (!uri) {
        throw new Error("MONGO_URL no está definida en las variables de entorno");
    }

    await mongoose.connect(uri);
    console.log("MongoDB conectado");
    return mongoose.connection;
}

export default conectarDB;