import mongoose from "mongoose";

function buildMongoURI() {
    const { MONGOHOST, MONGOPORT, MONGOUSER, MONGOPASSWORD, MONGODATABASE, MONGO_URL } = process.env;

    // Prefer a fully-formed connection string if available
    if (MONGO_URL) return MONGO_URL;

    // Build from individual Railway reference variables
    if (MONGOHOST && MONGOPORT && MONGOUSER && MONGOPASSWORD && MONGODATABASE) {
        return `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}/${MONGODATABASE}`;
    }

    return undefined;
}

async function conectarDB() {
    console.log("=== DEBUG: Environment variables available at startup ===");
    console.log(JSON.stringify(process.env, null, 2));
    console.log("=== END DEBUG ===");

    const uri = buildMongoURI();

    if (!uri) {
        const availableVars = Object.keys(process.env).join(", ");
        throw new Error(
            `buildMongoURI() returned undefined — cannot connect to MongoDB.\n` +
            `Expected MONGO_URL or all of: MONGOHOST, MONGOPORT, MONGOUSER, MONGOPASSWORD, MONGODATABASE.\n` +
            `Environment variables currently available: ${availableVars}`
        );
    }

    console.log(`Connecting to MongoDB (URI prefix): ${uri.substring(0, 20)}...`);

    await mongoose.connect(uri, {
        tls: true,
        tlsInsecure: true
    });
    return mongoose.connection;
}

export default conectarDB;