import mongoose from "mongoose";

function buildMongoURI() {
    if (process.env.MONGO_URL) {
        return process.env.MONGO_URL;
    }

    const required = {
        MONGOHOST: process.env.MONGOHOST,
        MONGOPORT: process.env.MONGOPORT,
        MONGOUSER: process.env.MONGOUSER,
        MONGOPASSWORD: process.env.MONGOPASSWORD,
        MONGODATABASE: process.env.MONGODATABASE,
    };

    const missing = Object.entries(required)
        .filter(([, value]) => !value)
        .map(([key]) => key);

    if (missing.length > 0) {
        throw new Error(
            `MongoDB connection failed: missing environment variables: ${missing.join(", ")}. ` +
            `Provide either MONGO_URL or all of MONGOHOST, MONGOPORT, MONGOUSER, MONGOPASSWORD, MONGODATABASE.`
        );
    }

    const { MONGOHOST, MONGOPORT, MONGOUSER, MONGOPASSWORD, MONGODATABASE } = required;
    return `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}/${MONGODATABASE}`;
}

async function conectarDB() {
    const uri = buildMongoURI();
    await mongoose.connect(uri, {
        tls: true,
        tlsInsecure: true
    });
    return mongoose.connection;
}

export default conectarDB;