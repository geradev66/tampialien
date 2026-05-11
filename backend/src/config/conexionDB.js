import mongoose from "mongoose";

async function conectarDB() {
    const uri = process.env.MONGO_URL;
    await mongoose.connect(uri, {
        tls: true,
        tlsInsecure: true
    });
    return mongoose.connection;
}
export default conectarDB;