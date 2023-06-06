import { MongoClient } from "mongodb"

const uri = process.env.DB_URL
const options = {}

if (!uri) throw new Error("Please add your mongo uri")

declare global {
    var _mongoClientPromise: Promise<any>;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV !== 'production') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect();
    }

    clientPromise = global._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise














// const options = {}

// let client
// let clientPromise

// if (!process.env.DB_URL) {
//     throw new Error('Please add your Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//     // In development mode, use a global variable so that the value
//     // is preserved across module reloads caused by HMR (Hot Module Replacement).
//     if (!global._mongoClientPromise) {
//         client = new MongoClient(uri!, options)
//         global._mongoClientPromise = client.connect()
//     }
//     clientPromise = global._mongoClientPromise
// } else {
//     // In production mode, it's best to not use a global variable.
//     client = new MongoClient(uri!, options)
//     clientPromise = client.connect()
// }

// // Export a module-scoped MongoClient promise. By doing this in a
// // separate module, the client can be shared across functions.
// export default clientPromise