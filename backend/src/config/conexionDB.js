import mongoose from "mongoose";

async function conectarDB() {
    const uri = process.env.DB_CONECTION_STRING;
    await mongoose.connect(uri, {
        tls: true,
        tlsInsecure: true
    });
    return mongoose.connection;
}
export default conectarDB;