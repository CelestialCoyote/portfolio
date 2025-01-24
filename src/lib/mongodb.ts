import { MongoClient } from "mongodb";


// The connection URI for the MongoDB database, retrieved from the environment variable `MONGODB_URI`.
// If the environment variable is not set, it defaults to an empty string.
const uri = process.env.MONGODB_URI || "";
// Optional configurations for the MongoClient instance (empty in this case).
const options = {};

// Declaring a variable to hold the MongoClient instance.
let client: MongoClient;
// Declaring a variable to hold a promise that resolves to the MongoClient instance.
let clientPromise: Promise<MongoClient>;

// If the `MONGODB_URI` environment variable is not set, an error is thrown to inform the developer
// that the MongoDB connection string is missing.
if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

// Augmenting the global object to include a custom property `_mongoClientPromise`.
// This is used to store the MongoClient connection promise in development mode to prevent
// multiple connections during hot-reloading.
const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>
};

// Check if the app is running in development mode.
if (process.env.NODE_ENV === "development") {
    // If the `_mongoClientPromise` property does not exist on the global object:
    if (!globalWithMongo._mongoClientPromise) {
        // Create a new instance of MongoClient with the connection URI.
        client = new MongoClient(uri);
        // Initialize the connection and store the promise in the `_mongoClientPromise` property
        // on the global object. This ensures the client is reused across hot-reloads.
        globalWithMongo._mongoClientPromise = client.connect();
    }
    // Assign the stored promise to `clientPromise` for use in the app.
    clientPromise = globalWithMongo._mongoClientPromise;
// In production mode:
} else {
    // Create a new instance of MongoClient with the connection URI and any provided options.
    client = new MongoClient(uri, options);
    // Connect to the database and assign the promise to `clientPromise`.
    clientPromise = client.connect();
}

export default clientPromise;
