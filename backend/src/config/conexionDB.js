import mongoose from "mongoose";

async function conectarDB() {
    const uri = process.env.DB_CONECTION_STRING;
    await mongoose.connect(uri);
    return mongoose.connection;
}
export default conectarDB;